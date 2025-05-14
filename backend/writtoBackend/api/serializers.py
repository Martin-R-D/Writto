from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Posts, PostsLikes, Comments, FriendRequets

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], None, validated_data['password'])
        return user
    

class PostsSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Posts
        fields = '__all__'

class PostsLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostsLikes
        fields = '__all__'


class CommentsSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Comments
        fields = '__all__'

class FriendRequetsSerializer(serializers.ModelSerializer):
    from_user = serializers.ReadOnlyField(source='from_user.username')
    class Meta:
        model = FriendRequets
        fields = '__all__'