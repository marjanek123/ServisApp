#!/bin/sh
if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."
    
    while ! nc -z $DB_HOST $DB_PORT; do
      sleep 0.1
    done
    
    echo "PostgreSQL started"
fi

python manage.py collectstatic --noinput
python manage.py makemigrations --noinput
python manage.py migrate --noinput
echo "from accounts.models import Person;
Person.objects.filter(email='$DJANGO_ADMIN_EMAIL').delete();
Person.objects.create_superuser('$DJANGO_ADMIN_USER', '$DJANGO_ADMIN_EMAIL', '$DJANGO_ADMIN_PASSWORD')" | python manage.py shell

exec "$@"