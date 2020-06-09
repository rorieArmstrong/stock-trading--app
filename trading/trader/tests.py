from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import CustomUser, Stocks


class TestAuthenticatedView(TestCase):
    def test_anonymous_cannot_see_page(self):
        response = self.client.get("/d")
        self.assertRedirects(response, "/accounts/login/?next=/d")

    def test_authenticated_user_can_see_page(self):
        user = CustomUser.objects.create_user("Test," "test@project.com", "some_pass")
        self.client.force_login(user=user)
        response = self.client.get("/d")
        self.assertEqual(response.status_code, 200)
        # Or assert you can see stuff on the page

class TestStocksPOST(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user("Tester," "test@project.com", "some_pass")
        self.data = {
            "stock_symbol": "TEST",
            "stocks_bought_number": 10,
            "bought_at_price": 100,
            "userID": 1
        }

    def test_cant_post_unauthenticated(self):
        response = self.client.post("/api/stocks/", data=self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_request_can_create_new_entity(self):
        self.client.force_login(user=self.user)
        response = self.client.post("/api/stocks/", data=self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Stocks.objects.count(), 1)
        self.assertEqual(Stocks.objects.get().bought_at_price, 100)
        #print(Stocks.objects.get().userID)
        #self.assertEqual(Stocks.objects.get().userID, '<CustomUser: Tester,test@project.com>')
        self.assertEqual(Stocks.objects.get().stock_symbol, "TEST")
        self.assertEqual(Stocks.objects.get().stocks_bought_number, 10)

class TestStocksGET(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user("Test," "test@project.com", "some_pass")

    def test_cant_get_unauthenticated(self):
        response = self.client.get("/api/stocks/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_request_can_retrieve_entity(self):
        self.client.force_login(user=self.user)
        response = self.client.get("/api/stocks/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Stocks.objects.count(), 0)


class TestStocksPUT(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user("Tester," "test@project.com", "some_pass")
        self.data = {
            "stock_symbol": "TEST",
            "stocks_bought_number": 10,
            "bought_at_price": 100,
            "userID": 1
        }
        self.client.force_login(user=self.user)
        self.client.post("/api/stocks/", data=self.data)
        self.client.logout()
        self.put_data = {
            "stock_symbol": "TEST2",
            "stocks_bought_number": 5,
            "bought_at_price": 200,
            "userID": 1
        }

    def test_cant_put_unauthenticated(self):
        response = self.client.put("/api/stocks/1/", data=self.put_data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_put_request_can_edit_entity(self):
        self.client.force_login(user=self.user)
        response = self.client.put("/api/stocks/1/", data=self.put_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Stocks.objects.count(), 1)
        self.assertEqual(Stocks.objects.get().bought_at_price, 200)
        self.assertEqual(Stocks.objects.get().stock_symbol, "TEST2")
        self.assertEqual(Stocks.objects.get().stocks_bought_number, 5)

        
class TestStocksPATCH(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user("Test," "test@project.com", "some_pass")
        self.data = {
            "stock_symbol": "TEST",
            "stocks_bought_number": 10,
            "bought_at_price": 100,
            "userID": 1
        }
        self.client.force_login(user=self.user)
        self.client.post("/api/stocks/", data=self.data)
        self.client.logout()

    def test_cant_patch_unauthenticated(self):
        response = self.client.patch("/api/stocks/1/", data={"bought_at_price": 500})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_patch_request_can_edit_entity(self):
        self.client.force_login(user=self.user)
        response = self.client.patch("/api/stocks/1/", data={"bought_at_price": 500})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Stocks.objects.count(), 1)
        self.assertEqual(Stocks.objects.get().bought_at_price, 500)

class TestStocksDELETE(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user("Test," "test@project.com", "some_pass")
        self.data = {
            "stock_symbol": "TEST",
            "stocks_bought_number": 10,
            "bought_at_price": 100,
            "userID": 1
        }
        self.client.force_login(user=self.user)
        self.client.post("/api/stocks/", data=self.data)
        self.client.logout()

    def test_cant_delete_unauthenticated(self):
        response = self.client.delete("/api/stocks/1/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_request_can_edit_entity(self):
        self.client.force_login(user=self.user)
        response = self.client.delete("/api/stocks/1/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Stocks.objects.count(), 0)
        
