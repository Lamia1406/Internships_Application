from django.db import models

class Posts(models.Model):
    title = models.CharField(max_length=60)
    description=models.CharField(max_length=1000)
    published_at = models.DateField()
    company = models.CharField(max_length=60)

    def __str__(self):
        return self.title