from django.db import models

# Create your models here.
class User(models.Model):
    game_id = models.CharField(max_length=50)
    game_password = models.CharField(max_length=50)
    def __str__(self):
        return self.name