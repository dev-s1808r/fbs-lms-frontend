import React from "react";
import SideTabDrop from "./SideTabDrop";
import "../../../assets/styles/sidebar/sidebar.css";
import { setCurrentPlaylistToNull } from "../../../features/mediaSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SideTab({ heading }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	return (
		<div className="sideTabComponent">
			<h3
				className="sideTabComponent__heading"
				onClick={() => {
					dispatch(setCurrentPlaylistToNull());
					navigate("/");
				}}
			>
				{heading}
			</h3>
			<SideTabDrop heading={heading} />
		</div>
	);
}

export default SideTab;
