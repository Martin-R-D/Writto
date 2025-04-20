from django.db import models

class Users(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=30)
    
