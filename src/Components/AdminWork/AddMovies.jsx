import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import movieService from "../../Appwrite/MovieServices"

import Input from '../CustomUI/Input'
import Select from '../CustomUI/Select'
import TextArea from '../CustomUI/TextArea'
import Button from '../CustomUI/Button'
import FileUpload from './FileUpload'

function AddMovies({ movie }) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: movie?.title || "",
      category: movie?.category || "",
      description: movie?.description || "",
    }
  })

  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [bannerPreview, setBannerPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const thumbnailFile = watch("thumbnail")
  const bannerFile = watch("banner")

  useEffect(() => {
    if (thumbnailFile && thumbnailFile[0]) {
      const preview = URL.createObjectURL(thumbnailFile[0])
      setThumbnailPreview(preview)
    }
  }, [thumbnailFile])

  useEffect(() => {
    if (bannerFile && bannerFile[0]) {
      const preview = URL.createObjectURL(bannerFile[0])
      setBannerPreview(preview)
    }
  }, [bannerFile])

  const submit = async (data) => {
    setLoading(true)

    try{
      if (movie) {

        let thumbnailId = movie.thumbnailFile
        let bannerId = movie.bannerFile

        if (data.thumbnail?.[0]) {
          const uploadedThumbnail = await movieService.uploadFile(data.thumbnail[0])
          await movieService.deleteFile(movie.thumbnailFile)
          thumbnailId = uploadedThumbnail.$id
        }

        if (data.banner?.[0]) {
          const uploadedBanner = await movieService.uploadFile(data.banner[0])
          await movieService.deleteFile(movie.bannerFile)
          bannerId = uploadedBanner.$id
        }

        const updatedMovie = await movieService.updateMovie(
          movie.$id,
          {
            title: data.title,
            category: data.category,
            description: data.description,
            thumbnailFile: thumbnailId,
            bannerFile: bannerId
          }
        )

        if (updatedMovie) {
          navigate("/admin/movies")
        }

      }

      else {

        const newMovie = await movieService.createMovie({
  title: data.title,
  category: data.category,
  description: data.description,
  thumbnailFile: data.thumbnail[0],
  bannerFile: data.banner[0]
})

        if (newMovie) {
          navigate("/admin/movies")
        }
      }

    } catch (error) {
      console.log("Submit Error:", error)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-8">
      <div className="max-w-3xl mx-auto bg-[#1a1a1a] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">
          {movie ? "Edit Movie" : "Add New Movie"}
        </h2>

        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-6"
        >
          <Input
            label="Movie Title"
            placeholder="Enter movie title"
            {...register("title", { required: true })}
          />

          <Select
            label="Category"
            options={["Action", "Drama", "Comedy", "Horror"]}
            {...register("category", { required: true })}
          />

          <TextArea
            label="Description"
            rows={5}
            placeholder="Enter movie description"
            {...register("description", { required: true })}
          />

          <FileUpload
            label="Thumbnail Image"
            accept="image/*"
            {...register("thumbnail")}
          />

          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="w-48 h-28 object-cover rounded-md border border-gray-700"
            />
          )}

          <FileUpload
            label="Banner Image"
            accept="image/*"
            {...register("banner")}
          />

          {bannerPreview && (
            <img
              src={bannerPreview}
              alt="Banner Preview"
              className="w-full h-40 object-cover rounded-md border border-gray-700"
            />
          )}

          <Button
            type="submit"
            bgColor="bg-red-600 hover:bg-red-700"
            textColor="text-white"
            className="py-3 rounded-md font-medium transition-all duration-200"
          >
            {loading ? "Processing..." : movie ? "Update Movie" : "Upload Movie"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AddMovies