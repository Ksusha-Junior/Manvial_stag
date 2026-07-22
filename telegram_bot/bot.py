import os
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes, MessageHandler, filters
import aiohttp
import json
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("TOKEN")
API_URL = "https://api.remontokontut.by"


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /start"""
    keyboard = [
        [InlineKeyboardButton("Посмотреть услуги", callback_data='show_services')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        "Добро пожаловать! \n"
        "Я помогу  рассчитать стоимость услуг. \n"
        "Внимание! Я рассчитаю ориентировочную стоимость ремонта.\n"
        "Обращаю внимание! На услуги по регулировке окон ПВХ скидка от заказа 2 створки и более!",
        reply_markup=reply_markup
    )


async def show_services(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Показывает список доступных услуг"""
    async with aiohttp.ClientSession() as session:
        async with session.get(f"{API_URL}/service/") as response:
            services = await response.json()

    keyboard = []
    for service in services:
        keyboard.append([
            InlineKeyboardButton(
                service['service'],
                callback_data=f"select_service_{service['id']}"
            )
        ])

    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.callback_query.answer()
    await update.callback_query.edit_message_text(
        "Выберите услугу:",
        reply_markup=reply_markup
    )



async def select_service(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик выбора услуги"""
    query = update.callback_query
    await query.answer()

    service_id = query.data.split('_')[-1]

    # Сохраняем выбранный service_id в контексте пользователя
    context.user_data['selected_service'] = service_id

    if service_id == '1':
        await query.edit_message_text(
            "Введите количество створок: число")
    elif service_id ==  '2' :
        await query.edit_message_text(
            "Введите количество дверей: число")
    elif service_id == '5':
        await query.edit_message_text(
            "Введите количество уплотнителя: метр погонный:")
    elif service_id == '3':
        await query.edit_message_text(
            "Введите количество створок: число")
    elif service_id == '4':
        await query.edit_message_text(
            "Введите количество дверей: число")
    elif service_id == '6':
        await query.edit_message_text(
            "Введите количество створок: число")
    else:
        await query.edit_message_text(
            "Введите количество стеклопакета: метр квадратный:")

    # Устанавливаем следующий обработчик для получения количества
    context.user_data['waiting_for_quantity'] = True


async def handle_quantity(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик ввода количества объектов"""
    if not context.user_data.get('waiting_for_quantity'):
        return

    try:
        quantity_text = update.message.text
        quantity_text = quantity_text.replace(',', '.')
        quantity = float(quantity_text)
        service_id = context.user_data.get('selected_service')
        if not service_id:
            await update.message.reply_text("Пожалуйста, сначала выберите услугу через /start")
            return

        # Получаем расчет цены
        async with aiohttp.ClientSession() as session:
            async with session.get(
                    f"{API_URL}/calculate_price/?service_id={service_id}&quantity={quantity}"
            ) as response:
                result = await response.json()

        # Формируем ответ
        message = (
            f"Расчет стоимости:\n"
            f"Услуга: {result['service']}\n"
            f"Количество: {result['quantity']}\n"
            f"Базовая цена: {result['base_price']} руб.\n"
            f"Итоговая сумма: {result['total_price']} руб."
        )

        # Сбрасываем флаг ожидания количества
        context.user_data['waiting_for_quantity'] = False

        # Добавляем кнопку для нового расчета
        keyboard = [[InlineKeyboardButton("Новый расчет", callback_data='show_services')]]
        reply_markup = InlineKeyboardMarkup(keyboard)

        await update.message.reply_text(message, reply_markup=reply_markup)

    except ValueError:
        await update.message.reply_text("Пожалуйста, введите число!")
    except Exception as e:
        print(f"Ошибка при расчёте: {e}")
        await update.message.reply_text("Произошла ошибка при расчете. Попробуйте еще раз.")




def main():
    # Создаем приложение
    application = Application.builder().token(TOKEN).build()

    # Добавляем обработчики
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CallbackQueryHandler(show_services, pattern='^show_services$'))
    application.add_handler(CallbackQueryHandler(select_service, pattern='^select_service_'))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_quantity))

    # Запускаем бота
    application.run_polling()


if __name__ == '__main__':
    main()