import React from 'react'
import {Client, Account, ID, Databases, Storage, Query} from "appwrite"
import conf from '../Conf/conf'

export class MovieServices {
  client = new Client();
  databases;
  bucket;

  constructor() {
     this.client
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
  }

  async createMovie({title, description, category, rating, releaseYear, thumbnailFile, bannerFile}) {
    try {
      const thumbnailFileUpload = await this.uploadFile(thumbnailFile)

      const bannerFileUpload = await this.uploadFile(bannerFile)

      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          description,
          category,
          rating,
          releaseYear,
          views:0,
          istrending:false,
          thumbnail: thumbnailFileUpload.$id,
          banner: bannerFileUpload.$id
        }
      )
    } catch (error) {
      console.log("Appwrite Server : createMovie : error", error)
      throw error
    }
  }

  async updateMovie(movieId, {title, description, category, rating, releaseYear, thumbnailFile, bannerFile}) {
    try {
      const movie = await this.getMovieById(movieId)
      let thumbnailId = movie.thumbnail
      let bannerId = movie.banner

      if(thumbnailFile){
        const updatedThumbnail = await this.uploadFile(thumbnailFile)
        thumbnailId = updatedThumbnail.$id

        if(movie.thumbnail){
          await this.deleteFile(movie.thumbnail)
        }
      }

      if(bannerFile) {
        const updatedbanner = await this.uploadFile(bannerFile)
        bannerId = updatedbanner.$id

        if(movie.banner){
          await this.deleteFile(movie.banner)
        }
      }

      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        movieId,
        {
          title,
          description,
          category,
          rating,
          releaseYear,
          thumbnail: thumbnailId,
          banner: bannerId
        }
      )
    } catch (error) {
      console.log("Appwrite Server : updateMovie : error", error)
      throw error
    }
  }

  async getMovieById(movieId) {
    try {
     return await this.databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      movieId
    )
    } catch (error) {
      console.log("Appwrite Server : getMovieById : error", error)
      throw error
    }
  }

  async getAllMovies(queries = []) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      )
    } catch (error) {
      console.log("Appwrite Server : getAllMovies : error", error)
      throw error
    }
  }

  async getTrendingMovies() {
    try {
      return this.getAllMovies([
        Query.orderDesc("views"),
        Query.limit(10)
      ])
    } catch (error) {
      console.log("Appwrite Server : getTrendingMovies : error", error)
      throw error
    }
  }

  async getMoviesByCategory(category) {
    try {
      return this.getAllMovies([
        Query.equal("category", category)
      ])
    } catch (error) {
      console.log("Appwrite Server : getMoviesByCategory : error", error)
      throw error
    }
  }
  
  async deleteMovie(movieId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        movieId
      )
      return true
    } catch (error) {
      console.log("Appwrite Server : deleteMovie : error", error)
      return false
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log("Appwrite Server : uploadFile : error", error)
      throw error
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      )
      return true
    } catch (error) {
      console.log("Appwrite Server : deleteFile : error", error)
      throw error
    }
  }
  
  async getFilePreview(fileId) {
    return this.bucket.getFilePreview(
      conf.appwriteBucketId,
      fileId
    )
  }
}

const movieService = new MovieServices();
export default movieService