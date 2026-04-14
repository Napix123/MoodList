import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generatePlaylist } from "../api/client";
import type { Playlist } from "../types";
import PromptBar from "../components/PromptBar";

const l