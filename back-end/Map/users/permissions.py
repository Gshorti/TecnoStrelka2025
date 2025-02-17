from rest_framework import permissions
class UpdateUserPermission(permissions.BasePermission):
    """
    Позволяет изменять данные пользователя только самому пользователю.
    """

    def has_object_permission(self, request, view, obj):
        if request.method == "PUT" or request.method == "PATCH" \
                or request.method == "DELETE":
            if obj.name == request.META.get("HTTP_X_USERNAME") and obj.password == request.META.get("HTTP_X_PASSWORD"):
                return True
            else:
                return False
