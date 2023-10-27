import React, { useEffect, useState } from "react";
import "../../assets/styles/modals/editUserDetails.css";
import {
	handleModalVisibility,
	toggleUpdateState,
} from "../../features/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylist } from "../../api/users/userApi";
import { getAllPlaylists } from "../../api/users/userApi";

import { useUiStore } from "../../app/store/useUiStore";

function EditUserDetails() {
	const [playlists, setPlaylists] = useState([]);
	const [pl, setPl] = useState("");

	const modalState = useSelector((state) => state.uiState.modalVisible);
	const userInQuestion = useSelector((state) => state.uiState.userInQuestion);

	// const z_modalState = useUiStore((state) => state.isModalOpen);
	// const z_userInQuestion = useUiStore((state) => state.userInQuestion);
	// const z_handleModalVisibility = useUiStore(
	// 	(state) => state.z_handleModalVisibility
	// );

	const dispatch = useDispatch();

	const handleDropChange = (e, playlist) => {
		console.log(e.target.value);
		let p = playlist.find((p) => e.target.value === p.label);
		if (!p) {
			alert("select a valid option");
		} else {
			setPl(p);
			console.log(p._id);
		}
	};

	const handlePlaylistUpdate = () => {
		addPlaylist(userInQuestion._id, pl);
		dispatch(toggleUpdateState());
	};

	useEffect(() => {
		getAllPlaylists()
			.then((data) => {
				setPlaylists(data);
			})
			.catch((error) => {
				console.error("Error fetching playlists:", error);
			});
	}, []);

	return (
		<div className={modalState ? "eudModalMain" : "hideModal"}>
			<h1> {userInQuestion?.firstName} </h1>
			<div className="uploadMedia__dropdown">
				<label htmlFor="playlist">Playlists</label>
				<select
					id="playlist"
					name="playlist"
					required
					className="uploadMedia__dropdown-selectField"
					onChange={(e) => handleDropChange(e, playlists)}
				>
					<option value="">Select a playlist</option>
					{playlists.map((p) => (
						<option value={p.label} key={p._id}>
							{p.label}
						</option>
					))}
				</select>
			</div>
			<button onClick={handlePlaylistUpdate} style={{ width: "80px" }}>
				Add
			</button>
			<h3>Accessible Playlists</h3>
			{userInQuestion?.accessDetails?.playlists?.map((p) => {
				return <p key={p._id}>{p.label}</p>;
			})}
			<button
				onClick={() => dispatch(handleModalVisibility({}))}
				style={{ width: "80px" }}
			>
				Close
			</button>
		</div>
	);
}

export default EditUserDetails;
