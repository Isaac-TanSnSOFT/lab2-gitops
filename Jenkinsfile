pipeline {
  agent any

  environment {
    AWS_REGION = 'ap-southeast-1'
    SERVICE = 'frontend'
    IMAGE_REPO = '827812789584.dkr.ecr.ap-southeast-1.amazonaws.com/frontend'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Login to ECR') {
      steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-ecr-creds']]) {
          sh '''
            aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $IMAGE_REPO
          '''
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          def imageTag = sh(script: "date +%Y%m%d%H%M%S", returnStdout: true).trim()
          env.IMAGE_TAG = imageTag
        }
        sh 'docker build -t $IMAGE_REPO:$IMAGE_TAG ./frontend'
      }
    }

    stage('Push Image to ECR') {
      steps {
        sh 'docker push $IMAGE_REPO:$IMAGE_TAG'
      }
    }

    stage('Update Deployment YAML') {
      steps {
        sh '''
          sed -i "s|image: .*|image: $IMAGE_REPO:$IMAGE_TAG|" ./frontend/frontend-deployment.yaml
        '''
      }
    }

    stage('Commit & Push Changes') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'github-creds', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
          sh '''
            git config user.name "Jenkins"
            git config user.email "jenkins@example.com"
            git add ./frontend/frontend-deployment.yaml
            git commit -m "Update frontend image tag to $IMAGE_TAG"
            git push https://$GIT_USER:$GIT_PASS@github.com/Isaac-TanSnSOFT/lab2-gitops.git HEAD:main
          '''
        }
      }
    }
  }
}

