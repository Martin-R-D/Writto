from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response 
from .serializers import RegistrationSerializer, PostsSerializer, PostsLikesSerializer, CommentsSerializer, FriendRequetsSerializer, FriendsSerializer, MessagesSerializer
from rest_framework import viewsets
from .models import Posts, PostsLikes, Comments, FriendRequets, Friends, Messages
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Q

class RegistrationView(APIView):    
    permission_classes = [AllowAny]

    def post(self, request):    
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    

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
    

class LikedPostsIds(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        likedPosts = PostsLikes.objects.filter(user=user).values_list('post', flat=True)
        return Response({'postIds': list(likedPosts)}, status=200)
    
class CommentsView(viewsets.ModelViewSet):
    serializer_class = CommentsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        postId = self.request.query_params.get('post_id', None)
        if postId is not None:
            post = Posts.objects.filter(id=postId).first()
            return Comments.objects.filter(post=post)
        return Comments.objects.none()
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user, post=Posts.objects.filter(id=self.request.data.get('post')).first())

class FriendRequetsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        to_user = User.objects.filter(username=request.data.get('username')).first()
        if to_user is None:
            return Response({'error': 'User not found'}, status=404)
        
        if to_user == request.user:
            return Response({'error': 'You cannot send a friend request to yourself'}, status=400)

        if FriendRequets.objects.filter(from_user=request.user, to_user=to_user).exists():
            return Response({'error': 'Friend request already sent'}, status=400)
        if FriendRequets.objects.filter(from_user=to_user, to_user=request.user).exists():
            return Response({'error': 'This user already sent you a friend request'}, status=400)
        
        if Friends.objects.filter(user1=request.user, user2=to_user).exists() or Friends.objects.filter(user1=to_user, user2=request.user).exists():
            return Response({'error': 'You are already friends'}, status=400)



        friendRequest = FriendRequets.objects.create(from_user=request.user, to_user=to_user)

        serializer = FriendRequetsSerializer(friendRequest)
        return Response(serializer.data, status=201)
    
    def get(self, request):
        sent_invites = self.request.query_params.get('sentInvites', None)
        user = request.user
        if sent_invites is not None:
            friendRequets = user.send_friend_requests.all()
            serializer = FriendRequetsSerializer(friendRequets, many=True)
            return Response(serializer.data, status=200)
        friendRequets = user.received_friend_requests.all()
        serializer = FriendRequetsSerializer(friendRequets, many=True)
        return Response(serializer.data, status=200)   

    def delete(self, request, pk):
        friendRequest = FriendRequets.objects.filter(pk=pk).first() 
        if friendRequest is None:
            return Response({'error': 'Friend request not found'}, status=404)
        friendRequest.delete()
        return Response({'message': 'Friend request deleted'}, status=200)
    
class FriendsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from_user = User.objects.filter(username=request.data.get('username')).first()
        to_user = request.user
        friendRequest = FriendRequets.objects.filter(from_user=from_user, to_user=to_user).first()
        if friendRequest is not None:
            friendRequest.delete()
            friend = Friends.objects.create(user1=from_user, user2=to_user)
            serializer = FriendsSerializer(friend)
            return Response(serializer.data, status=201)
        return Response({'error': 'Friend request not found'}, status=404)
    
    def get(self, request):
        user = request.user
        friends1 = user.user1.all()
        friends2 = user.user2.all()
        friends = friends1.union(friends2)
        serializer = FriendsSerializer(friends, many=True)
        return Response(serializer.data, status=200)
    
    def delete(self, request, pk):
        friend = Friends.objects.filter(pk=pk).first() 
        if friend is None:
            return Response({'error': 'Friend not found'}, status=404)
        friend.delete()
        return Response({'message': 'Friend deleted'}, status=200)
    
class MessagesView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = MessagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(sender=request.user, receiver=User.objects.filter(username=request.data.get('receiver')).first())
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def get(self, request, friendUsername):
        user = request.user
        friend = User.objects.get(username=friendUsername)
        messages = Messages.objects.filter(Q(sender=user, receiver=friend) | Q(sender=friend, receiver=user)).order_by('time')
        serializer = MessagesSerializer(messages, many=True)
        return Response(serializer.data, status=200)
    
    