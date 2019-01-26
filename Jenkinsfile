pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
        archiveArtifacts(artifacts: 'build/**/*', onlyIfSuccessful: true)
      }
    }
    stage('Deploy') {
      when {
        branch 'master'
      }
      steps {
        withCredentials([string(credentialsId: 'firebase-tuffy_estates', variable: 'FIREBASE_TOKEN')]) {
          sh 'npm run deploy'
        }
      }
    }
  }
}
