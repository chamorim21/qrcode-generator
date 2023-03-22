# qrcode-generator

This project is composed of a frontend written in NextJS and a backend written in Django with Django Rest Framework. It also includes a docker-compose file that manages both projects and runs them.
Its purpose is be a tool to help customers creating a overview of your information in a easy way. After filling a simple form, you will have a QRCode that redirects to a page that shows the informations you gave.

## Getting started

To get started, you'll need to have Docker and Docker Compose installed on your machine. Once you have those installed and have the enviroment variables configured, simply run the following command:

```bash
docker-compose up
```
This will build and start the frontend and backend containers. You can then access the application by navigating to http://localhost:3000.

## Examples

### Homepage - QR Code Generator
![Screenshot from 2023-03-20 15-32-04](https://user-images.githubusercontent.com/63121316/226433996-18807233-2612-4404-a930-e3cf0462c461.png)

After generating the QRCode, you will be redirected to the QRCode page:

### QR Code Page
![Screenshot from 2023-03-20 15-33-00](https://user-images.githubusercontent.com/63121316/226434221-34a840cf-1fcb-46fb-b406-67fd4198f2e1.png)

By scanning the QRCode, you will have a link with the informations:

### User information page
![Screenshot from 2023-03-20 15-33-51](https://user-images.githubusercontent.com/63121316/226434382-69c222d8-5799-4b43-b6f4-ecc8099fb691.png)
