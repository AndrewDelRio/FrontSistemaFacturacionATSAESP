import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import propertyIcon from "../../../assets/images/property.svg"
import searchIcon from "../../../assets/images/search.svg"
import warningIcon from "../../../assets/images/warning.svg"
import addPropertyIcon from "../../../assets/images/addProperty.svg"
import ModalMessagePerformed from "../../../components/ModalMessagePerformed/ModalMessagePerformed"
import ControlButton from "../../../components/ControlButton/ControlButton"
import {getPropertyByID} from "../../../services/PropertiesService"

import './PropertiesWindows.css'