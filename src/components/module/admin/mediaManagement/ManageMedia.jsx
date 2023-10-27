import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../../../../assets/styles/modules/mediaManagement.css";
import { useNavigate } from "react-router-dom";
import ShowMediaList from "../../media/ShowMediaList";

const MediaUploadForm = () => {
	const [playlistsArray, setPlaylistsArray] = useState([]);
	const [uploading, setUploading] = useState(false);

	const navigate = useNavigate();

	// get all media from server
	useEffect(() => {
		axios
			.get("http://localhost:8000/api/v1/admin/get-all-playlists")
			.then((response) => {
				const fetchedPlaylists = response.data;
				// console.log(fetchedPlaylists);
				setPlaylistsArray(fetchedPlaylists);
			})
			.catch((error) => {
				console.log("Error fetching playlists:", error);
			});
	}, []);

	const returnPlaylistId = (playlist) => {
		let p = playlistsArray.find((p) => playlist === p.label);
		return p._id;
	};

	// upload media server
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("title", e.target.title.value);
		formData.append("thumbnail", e.target.thumbnail.files[0]);
		formData.append("mediaFile", e.target.mediaFile.files[0]);
		formData.append("description", e.target.description.value);
		formData.append("playlist", [
			returnPlaylistId(e.target.playlist.value),
			e.target.playlist.value,
		]);

		// Make a POST request to upload the media
		try {
			setUploading(true);
			console.log(formData);
			await axios
				.post(
					"http://localhost:8000/api/v1/admin/upload-media-to-cloud",
					formData,
					{
						withCredentials: true,
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				)
				.then((response) => {
					console.log(response.data);
					setUploading(false);
				});
			e.target.reset();
		} catch (error) {
			console.error(error.message);
			setUploading(false);
		}
	};

	// check user
	const userRole = useSelector((state) => state.userState.user.user.role);

	if (userRole !== "admin") {
		navigate("/");
	}

	return (
		<div className="uploadMedia__module">
			<section className="uploadMedia__formSection">
				<h2 className="uploadMedia__sectionTitle">Upload Media</h2>

				<form onSubmit={handleSubmit} className="uploadMedia__form">
					<div className="uploadMedia__mediaTitle">
						<label htmlFor="title">Video Title</label>
						<input
							type="text"
							id="title"
							name="title"
							required
							className="uploadMedia__mediaTitle-input"
						/>
					</div>

					<div className="uploadMedia__thumbnail">
						<label htmlFor="thumbnail">Thumbnail (JPEG or PNG)</label>
						<input
							type="file"
							id="thumbnail"
							name="thumbnail"
							accept="image/jpeg, image/png"
							required
							className="uploadMedia__thumbnail-inputField"
						/>
					</div>

					<div className="uploadMedia__thumbnail">
						<label htmlFor="mediaFile">Media File (video)</label>
						<input
							type="file"
							id="mediaFile"
							name="mediaFile"
							accept="video/*"
							required
						/>
					</div>

					<div>
						<label htmlFor="description" className="uploadMedia__mediaTitle">
							Description
						</label>
						<textarea
							id="description"
							name="description"
							className="uploadMedia__mediaTitle-input desBox"
							rows={10}
						></textarea>
					</div>

					<div className="uploadMedia__dropdown">
						<label htmlFor="playlist">Playlist</label>
						<select
							id="playlist"
							name="playlist"
							required
							className="uploadMedia__dropdown-selectField"
						>
							<option value="" disabled>
								Select a playlist
							</option>
							{playlistsArray.map((p) => (
								<option value={p.label} key={p._id}>
									{p.label}
								</option>
							))}
						</select>
					</div>

					<button
						className="uploadForm__submitButton"
						type="submit"
						disabled={uploading}
					>
						{uploading ? "uploading files" : "Upload"}
					</button>
				</form>
			</section>

			<section className="uploadMedia__displaySection">
				<h2 className="uploadMedia__sectionTitle">Content</h2>
				<ShowMediaList />
			</section>
		</div>
	);
};

export default MediaUploadForm;
