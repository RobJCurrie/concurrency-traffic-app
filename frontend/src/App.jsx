import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import LessonOverviewPage from "./pages/LessonOverviewPage";
import LessonInteractivePage from "./pages/LessonInteractivePage";
import LessonsSimulationPage from "./pages/LessonSimulationPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/auth" replace />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/lessons/:id" element={<LessonOverviewPage />} />
                <Route path="/lessons/:id/interactive" element={<LessonInteractivePage />} />
                <Route path="/lessons/:id/simulation" element={<LessonsSimulationPage />} />
            </Routes>
        </BrowserRouter>
    )
}