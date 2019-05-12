# Bagel-Drops
CS-341 Shopping E-Commerical Website, Djangular. You need to install [**python 3.7.2**](https://www.python.org/downloads/release/python-372/), 
and [**angular cli**](https://angular.io/guide/quickstart). After installing the required packages, clone this repo and run **terminal/cmd** 
in the folder. **Note: Make sure to check on ADD Python to PATH while installing**
```console
bageldrops> python -m pip install --upgrade pip
bageldrops> pip install pipenv
bageldrops> pipenv install
bageldrops> pipenv sync
bageldrops> npm install
bageldrops> cd bageldrops-frontend
bageldrops-frontend> npm install
bageldrops> cd ..
bageldrops> pipenv shell
bageldrops> python manage.py makemigrations coupon product billing cart collection customer tax address
bageldrops> python manage.py migrate
bageldrops> python manage.py createsuperuser
bageldrops> python manage.py loaddata tax
bageldrops> python manage.py runserver
```
From here you can log in to the admin page at 127.0.0.1:8000/admin to add products, coupons, and collections.
Before your first user is created you must create a new group called "Customers" under groups on the admin page.
"Customers" should be given the permissions to add and change address, billing, and cart.
"Customers" should also be give permissions to change customer.

New coupons can be created under the Coupons section. Make sure the collection for the coupon to active with the ctive status button.

In another **terminal/cmd** run
```console
bageldrops> cd bageldrops-frontend
bageldrops-frontend> ng serve
```
Then open browser and go to 127.0.0.1:4200
