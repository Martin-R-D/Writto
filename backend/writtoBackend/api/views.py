from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response 
from .serializers import RegistrationSerializer, PostsSerializer, PostsLikesSerializer
from rest_framework import viewsets
from .models import Posts, PostsLikes
from rest_framework.permissions import IsAuthenticated, AllowAny


class RegistrationView(APIView):    
    permission_classes = [AllowAny]

    def post(self, request):    
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
# class LoginView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password') 
#         currentUser = authenticate(username=username, password=password)   
#         if currentUser is not None:
#             return Response({'response':'Logged in'}, status=200)
#         return Response({'response':'Invalid username or password'}, status=400)

class PostsView(viewsets.ModelViewSet):
    serializer_class = PostsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        exclude_user = self.request.query_params.get('exclude_user', None)

        if exclude_user is not None:
            return Posts.objects.exclude(author=user)
        return Posts.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class GetUserData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'username': request.user.username}, status=200)

class LikePost(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        currentId = request.data.get('post_id')
        post = Posts.objects.filter(id=currentId).first()
        user = request.user
        isLiked = PostsLikes.objects.filter(post=post, user=user).first()
        if isLiked is not None:
            post.likes -= 1
            post.save()
            isLiked.delete()
            return Response({'action':'unlike'}, status=200)
        
        serializer = PostsLikesSerializer(data={'post': post.id, 'user': user.id})
        if serializer.is_valid():
            serializer.save()
            post.likes += 1
            post.save()
            return Response({'action':'like'}, status=200)
        
        return Response(serializer.data, status=400)
    
class GetLikedPosts(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        posts = PostsLikes.objects.filter(user=user).values_list('post', flat=True)
        return Response({'posts': list(posts)}, status=200)