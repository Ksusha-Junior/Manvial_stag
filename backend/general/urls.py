from django.urls import path
from .views import PersonalinfoViewSet, OrganizationsViewSet, PeopleViewSet
from .views import PostViewSet, CommentViewSet, InterestingViewSet
from rest_framework.routers import DefaultRouter




router = DefaultRouter()
router.register(r'post', PostViewSet, 'post')
router.register(r'personalinfo', PersonalinfoViewSet, 'personalinfo')
router.register(r'comments', CommentViewSet, 'comments')
router.register(r'organizations', OrganizationsViewSet, 'organizations')
router.register(r'people', PeopleViewSet, 'people')
router.register(r'interesting', InterestingViewSet, 'interesting')


urlpatterns = router.urls
