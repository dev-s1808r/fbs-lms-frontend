import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import "../../../assets/styles/modules/playListComponent.css";
import { getMediaByPlaylist } from "../../../api/media/mediaApi";

function PlaylistComponent({ p }) {
	const [media, setMedia] = useState([]);
	useEffect(() => {
		getMediaByPlaylist(p._id)
			.then((data) => {
				setMedia(data.media);
			})
			.catch((error) => {
				console.error("Error fetching playlists:", error);
			});
	}, [p]);

	return (
		<div className="playlistComponent">
			<h3 className="playlistComponent__playlistName">{p?.label}</h3>
			<div className="playlistComponent__cardHolder pll">
				{media.map((m) => (
					<VideoCard m={m} />
				))}
			</div>
		</div>
	);
}

export default PlaylistComponent;
