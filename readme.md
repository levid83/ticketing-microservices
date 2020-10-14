# Ticket Marketplace - Event-Based Microservices With Kubernetes - demo project

Each service has its own database (MongoDB) and uses domain events to communicate with other services. NATS Streaming is used as an event bus.

### Services

- Auth service - implements JWT-based user authentication and protects API endpoints from unauthorized access
- Tickets service - handles ticket creation, editing and listing
- Orders service - handles ticket reservation, cancellation, and listing
- Payments service - handles credit card payments coming from users using Stripe as a payment processor
- Expiration service - watches for the expiration of ticket reservations using an expiration queue
- Kubernetes Ingress - provides routing rules to manage external users' access to the services in the Kubernetes cluster

### Global settings

1. In order to build and deploy this project you need Docker, Kubernetes and Skaffold

2. You can opt to deploy your application in the cloud by running the deployment scripts in github workflows. In this case you need a DigitalOcean account.

3. To run the app in your local cluster you need to set REACT_APP_BASE_URL =http://ingress-nginx-controller.ingress-nginx.svc.cluster.local in `./client/.env` file.
4. In case you want to deploy on Digital Ocean and want your frontend to be visible externally you have to use your own domain name and save it in `./client/.env` . Domain names can be configured under Digital Ocean's Networing menu (see the [docs](https://www.digitalocean.com/docs/networking/))

### Local deployment

1. Don't forget to select local Kubernetes context (`docker-desktop`) before running any commands
2. You need a Stripe account for payments and you have to set your secret Stripe API key. You can find it under `Developers->API keys->Secret key`

   ```
   kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<YOUR_SECRET_STRIPE_API_KEY>
   ```

3. Set secret key for JWT-based authentication:
   ```
   kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<YOUR_SECRET_KEY>
   ```
4. Install [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/)

5. Don't forget to select the local Kubernetes context
6. Go to de root directory then build and deploy your application:
   ```
   skaffold run
   ```

### DigitalOcean deployment from localhost

1. Create a Digital Ocean account
2. Create a Kubernetes cluster on DigitalOcean and name it `ticketing`
3. Generate a Digital Ocean access token
4. Install [doctl](https://github.com/digitalocean/doctl#installing-doctl)

5. To get access to the remote Kubernetes cluster run:
   ```
   doctl auth init
   ```
   and enter the access token
6. Add the credentials for the specified cluster to your local kubeconfig:

   ```
   doctl kubernetes cluster kubeconfig save <remote cluster name>
   ```

7. Don't forget to select remote Kubernetes context before running the following commands
8. You need a Stripe account and to set your secret Stripe API key. You can find it under `Developers->API keys->Secret key`

   ```
   kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<YOUR_SECRET_STRIPE_API_KEY>
   ```

9. Set secret key for JWT-based authentication:

   ```
   kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<YOUR_SECRET_KEY>
   ```

10. Install [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/)

11. Go to de root directory then build and deploy your application:

```
skaffold dev
```

### DigitalOcean deployment from Github

1. Create a Digital Ocean account
2. Create a Kubernetes cluster on DigitalOcean and name it `ticketing`
3. Generate a Digital Ocean access token
4. Create a Digital Ocean account
5. Create a Kubernetes cluster on DigitalOcean and name it `ticketing`
6. Generate a Digital Ocean access token
7. Install [doctl](https://github.com/digitalocean/doctl#installing-doctl)

8. To get access to the remote Kubernetes cluster run:

   ```
   doctl auth init
   ```

   and enter your Digital Ocean access token

9. Add the credentials for the specified cluster to your local kubeconfig:

   ```
   doctl kubernetes cluster kubeconfig save <remote cluster name>
   ```

10. Don't forget to select remote Kubernetes context before running the following commands

11. You need a Stripe account and to set your secret Stripe API key. You can find it under `Developers->API keys->Secret key`:

```
kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<YOUR_SECRET_STRIPE_API_KEY>
```

14. Set secret key for JWT-based authentication:

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<YOUR_SECRET_KEY>
```

13. Install [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/)

14. Add a secret variable DIGITALOCEAN_ACCESS_TOKEN on Github ( github project page -> `settings ->secrets->New secret`) and enter your DigitalOcean API access token
15. Save your digital ocean auth credentials in DOCKER_USERNAME and DOCKER_PASSWORD in secret variables on Github
16. On each push event to the `master` branch the deployment workflows get executed and the application gets deployed
