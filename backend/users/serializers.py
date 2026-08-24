from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'role', 'created_at']

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Name cannot be empty."
            )

        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                "Name must contain at least 3 characters."
            )

        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            if self.instance is None or self.instance.email != value:
                raise serializers.ValidationError(
                    "This email is already registered."
                )

        return value