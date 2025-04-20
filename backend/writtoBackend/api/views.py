from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer

@api_view(['POST'])
def registerUser(request):
    data=UserSerializer(data=request.data)
    if data.is_valid():
        data.save()
        return Response({'response':'You have registered successfully'}, status=201)
    return Response({'response': data.errors}, status=400)
