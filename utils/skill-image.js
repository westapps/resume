import nodeJs from '/public/svg/skills/nodejs.svg';
import aws from '/public/svg/skills/aws.svg';
import django from '/public/svg/skills/django.svg';
import docker from '/public/svg/skills/docker.svg';
import java from '/public/svg/skills/java.svg';
import javascript from '/public/svg/skills/javascript.svg';
import mongoDB from '/public/svg/skills/mongoDB.svg';
import postgresql from '/public/svg/skills/postgresql.svg';
import python from '/public/svg/skills/python.svg';
import react from '/public/svg/skills/react.svg';
import selenium from '/public/svg/skills/selenium.svg';
import tailwind from '/public/svg/skills/tailwind.svg';
import tensorflow from '/public/svg/skills/tensorflow.svg';
import typescript from '/public/svg/skills/typescript.svg';
import AI from '/public/svg/skills/ai.svg';
import pytorch from '/public/svg/skills/pytorch.svg';
import scala from '/public/svg/skills/scala.svg';
import jenkins from '/public/svg/skills/jenkins.svg';

 
export const skillsImage = (skill) => {
  const skillID = skill.toLowerCase();
  switch (skillID) {
    case 'node':
      return nodeJs;

    case 'docker':
      return docker;

    case 'javascript':
      return javascript;
    case 'react':
      return react;

    case 'typescript':
      return typescript;

    case 'mongodb':
      return mongoDB;

    case 'postgresql':
      return postgresql;
    case 'tailwind':
      return tailwind;

    case 'java':
      return java;

    case 'python':
      return python;

    case 'aws':
      return aws;

    case 'django':
      return django;

    case 'git':
      return git;

    case 'selenium':
      return selenium;

    case 'tensorflow':
      return tensorflow;

    case 'ai':
      return AI;

    case 'pytorch':
      return pytorch;

    case 'java':
      return java;

    case 'scala':
      return scala;

    case 'jenkins':
      return jenkins;

    default:
      break;
  }
}
