deploy-backend:
	gcloud builds submit --region=europe-central2 --config 'cloudbuild.yaml' 'backend/'
