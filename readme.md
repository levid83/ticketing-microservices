# Ticket Marketplace - Event-Based Microservices With Kubernetes - demo project

Each service has its own database (**MongoDB**) and uses domain events to communicate with other services. **NATS Streaming** is used as an event bus.

### Services

- **Auth Service** - implements **JWT-based** user authentication and protects **API endpoints** from unauthorized access
- **Tickets Service** - handles ticket creation, editing and listing
- **Orders Service** - handles ticket reservation, cancellation and listing
- **Payments Service** - handles credit card payments coming from users using **Stripe** as a payment processor
- **Expiration Service** - watches for the expiration of ticket reservations using an expiration queue
- **Kubernetes Ingress** - provides routing rules to manage external users' access to the services in the **Kubernetes cluster**

### Frontend

It's a **Server Side Rendered** React app with tickets and orders pages. It uses **Stripe Checkout** for payments and **Bootstrap** for styling.

### Global settings

1. In order to build and deploy this project you need **Docker**, **Kubernetes** and **Skaffold**

2. You can opt to deploy your application in the cloud by running the deployment scripts in **Github Workflows**. In this case you need a **DigitalOcean** account.

3. To deploy the application locally first you need to set the `baseURL` to http://ingress-nginx-controller.ingress-nginx.svc.cluster.local in `./client/api/build-client.js` file.

4. To deploy the application on **DigitalOcean** first you need to set the `baseURL` to a public domain name in the following file `./client/api/build-client.js`. Domain names can be configured under **DigitalOcean's Networing menu** (see the [docs](https://www.digitalocean.com/docs/networking/))

5. In case of production deployment change the `spec.rules.host` and the `service.beta.kubernetes.io/do-loadbalancer-hostname` configs to your own **domain name** in the following file `infrastructure/kubernetes-prod/ingress-service.yaml`

### Local development deployment

1. Add `ticketing.dev` to `hosts` file (`/etc/hosts` or `C:\Windows\Systems32\Drivers\etc\hosts`):

   ```
   127.0.0.1 ticketing.dev
   ```

2. Don't forget to select local **Kubernetes context** (`docker-desktop`) before running any commands

3. You need a **Stripe account** for payments and you have to set your secret **Stripe API key**. You can find it under `Developers->API keys->Secret key`

   ```
   kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<YOUR_SECRET_STRIPE_API_KEY>
   ```

4. Set the secret key for **JWT-based authentication**:

   ```
   kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<YOUR_SECRET_KEY>
   ```

5. Install [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/) locally

6. Go to the root directory, then build and deploy your application:
   ```
   skaffold run
   ```

### DigitalOcean production deployment from localhost

1. Create a **DigitalOcean** account

2. Create a **Kubernetes cluster** on **DigitalOcean** and name it `ticketing`

3. Install [doctl](https://github.com/digitalocean/doctl#installing-doctl)

4. Generate a **DigitalOcean access token**

5. To get access to the remote **Kubernetes cluster** run:
   ```
   doctl auth init -t <YOUR DIGITALOCEAN ACCESS TOKEN>
   ```
6. Add the credentials for the **specified cluster** to your local `kubeconfig`:

   ```
   doctl kubernetes cluster kubeconfig save <remote cluster name>
   ```

7. Don't forget to select remote **Kubernetes** context before running the following commands

8. You need a **Stripe account** and to set your secret **Stripe API key**. You can find it under `Developers->API keys->Secret key`

   ```
   kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<YOUR_SECRET_STRIPE_API_KEY>
   ```

9. Set the secret key for **JWT-based authentication**:

   ```
   kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<YOUR_SECRET_KEY>
   ```

10. Install [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/#digital-ocean/) for **DigitalOcean**

11. Go to the **root directory** and deploy your application:

```
kubectl apply -f infrastructure/kubernetes && kubectl apply -f infrastructure/kubernetes-prod
```

### DigitalOcean production deployment from Github

1. Create a **DigitalOcean** account

2. Create a **Kubernetes** cluster on **DigitalOcean** and name it `ticketing`

3. Generate a **DigitalOcean access token**

4. To get access to the remote **Kubernetes** cluster run:

   ```
   doctl auth init -t <YOUR DIGITALOCEAN ACCESS TOKEN>
   ```

   and enter your **DigitalOcean access token**

5. Add the credentials for the specified cluster to your **local kubeconfig**:

   ```
   doctl kubernetes cluster kubeconfig save <remote cluster name>
   ```

6. Don't forget to select remote **Kubernetes** context before running the commands bellow

7. You need a **Stripe account** and to set your secret **Stripe API key**. You can find it under `Developers->API keys->Secret key`:

   ```
   kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<YOUR_SECRET_STRIPE_API_KEY>
   ```

8. Set secret key for **JWT-based** authentication:

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<YOUR_SECRET_KEY>
```

12. Install [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/)

13. Add a secret variable `DIGITALOCEAN_ACCESS_TOKEN` on **Github** (github project page -> `settings ->secrets->New secret`) and enter your **DigitalOcean API access token**

14. Save your **DigitalOcean** auth credentials in `DOCKER_USERNAME` and in `DOCKER_PASSWORD` secret variables on **Github**

15. On each push event to the `master` branch the **deployment workflows** get executed and the application gets deployed
