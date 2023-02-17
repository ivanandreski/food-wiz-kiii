# Food Wiz



## Intro

This project is a fork of: (https://gitlab.com/ivan.andreski/food-base). It is used to learn about github workflows, uploading to DockerHub, creating Helm charts and uploading them tto github pages.

Update February 2023:
The project is an old version of food-wiz. The current version of food-wiz on gitlab uses a refactored SpringBoot backend instead of Flask.

## What is the project about

The project is an app for showing ner tags for documents from a corpus. It can also be used to expand the documents with new ner tags by selecting a word from a document and adding tags to it from several datasets. The datasets and the corpus file with the document is imported before starting to use the app, and the files are available in the original_data folder.

## Technologies used

Python Flask - Backend
React - Frontend
PostgreSql - Database
Docker - creating images for the frontend and backend
