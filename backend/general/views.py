from rest_framework import viewsets
from .serializers import PersonalinfoSerializer, InterestingSerializer
from .serializers import PostSerializer
from .serializers import CommentSerializer
from .serializers import OrganizationsSerializer
from .serializers import PeopleSerializer
from .models import Personal_info, Interesting, Post, Comment, Organizations, People


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    http_method_names = ['get']

class PersonalinfoViewSet(viewsets.ModelViewSet):
    queryset = Personal_info.objects.all()
    serializer_class = PersonalinfoSerializer
    http_method_names = ['get']


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    # Передаем request в сериализатор для получения абсолютных URL
    def get_serializer(self, *args, **kwargs):
        kwargs['context'] = self.get_serializer_context()
        return super().get_serializer(*args, **kwargs)
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class OrganizationsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Organizations.objects.all()
    serializer_class = OrganizationsSerializer

class PeopleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = People.objects.all()
    serializer_class = PeopleSerializer

class InterestingViewSet(viewsets.ModelViewSet):
    queryset = Interesting.objects.all()
    serializer_class = InterestingSerializer
    http_method_names = ['get']