import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../styles/SettingsModal.module.css';
import Slider from '@mui/material/Slider';
import ColorButton from '../components/ColorButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { localIP } from '../components/config';
import GradientButton from './GradientButton';

export default function SettingsModal(props) {
    const [settings, setSettings] = useState({});
    const [reset, setReset] = useState(false);
    const [fonts, setFonts] = useState([]);
    const [activeFont, setActiveFont] = useState();
    const [brightness, setBrightness] = useState();
    const [staticColor, setStaticColor] = useState();
    const [colorMode, setColorMode] = useState();
    const [gradStartColor, setGradStartColor] = useState();
    const [gradEndColor, setGradEndColor] = useState();

    const colorModeList = ['static', 'gradient'];

    function changeActiveFont(e, val) {
        if (val != null) {
            setActiveFont(val);
            let settings_copy = Object.assign({}, settings);
            settings_copy.active_font = val;
            setSettings(settings_copy);
        }
    }

    function changeBrightness(value) {
        setBrightness(value);
        let settings_copy = Object.assign({}, settings);
        settings_copy.brightness = value;
        setSettings(settings_copy);
    }

    function changeStaticColor(color, event) {
        setStaticColor(color.rgb);
        let settings_copy = Object.assign({}, settings);
        settings_copy.static_color = color.rgb;
        setSettings(settings_copy);
    }

    function changeGradStartColor(color, event) {
        setGradStartColor(color.rgb);
        let settings_copy = Object.assign({}, settings);
        settings_copy.grad_start_color = color.rgb;
        setSettings(settings_copy);
    }

    function changeGradEndColor(color, event) {
        setGradEndColor(color.rgb);
        let settings_copy = Object.assign({}, settings);
        settings_copy.grad_end_color = color.rgb;
        setSettings(settings_copy);
    }

    function changeColorMode(e, val) {
        if (val != null) {
            setColorMode(val);
            let settings_copy = Object.assign({}, settings);
            settings_copy.color_mode = val;
            setSettings(settings_copy);
        }
    }

    function sendSettings() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings),
        };
        fetch('http://' + localIP + ':5000/api/settings', requestOptions);
        props.handleModalClose();
    }

    useEffect(() => {
        fetch('http://' + localIP + ':5000/api/settings')
            .then((res) => res.json())
            .then((data) => {
                setSettings(data);
                setFonts(Object.keys(data.font_dict));
                setActiveFont(data.active_font);
                setBrightness(data.brightness);
                setStaticColor(data.static_color);
                setColorMode(data.color_mode);
                setGradStartColor(data.grad_start_color);
                setGradEndColor(data.grad_end_color);
            });
    }, [reset]);

    return (
        <div className={styles.container}>
            <Modal
                show={props.modalOpen}
                fullscreen='true'
                onHide={props.handleModalClose}
                className={styles.settingsModal}
                dialogClassName={styles.settingsModal}
                contentClassName={styles.settingsContent}
                backdropClassName={styles.settingsBackdrop}
                fullscreen={true}
                scrollable={true}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Retroboard Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.settingsBody}>
                    <div className={styles.settingsContainer}>
                        <Autocomplete
                            disablePortal
                            className={styles.textBox}
                            id='font-selector'
                            options={fonts}
                            sx={{ width: 200 }}
                            onChange={(e, val) => changeActiveFont(e, val)}
                            renderInput={(params) => (
                                <TextField {...params} label='Font' />
                            )}
                        />
                        <Chip label={activeFont} variant='outlined' />
                    </div>
                    <div className={styles.settingsContainer}>
                        Brightness:{' '}
                        <Slider
                            className={styles.brightnessSlider}
                            value={brightness}
                            aria-label='default'
                            valueLabelDisplay='auto'
                            sx={{ width: 200 }}
                            onChangeCommitted={(e, val) =>
                                changeBrightness(val)
                            }
                        />
                    </div>
                    <div className={styles.settingsContainer}>
                        <Autocomplete
                            disablePortal
                            className={styles.textBox}
                            id='color-mode-selector'
                            options={colorModeList}
                            sx={{ width: 200 }}
                            onChange={(e, val) => changeColorMode(e, val)}
                            renderInput={(params) => (
                                <TextField {...params} label='Color Mode' />
                            )}
                        />
                        <Chip label={colorMode} variant='outlined' />
                    </div>
                    {(() => {
                        if (colorMode == 'static') {
                            return (
                                <div className={styles.settingsContainer}>
                                    Static Font Color:{' '}
                                    <ColorButton
                                        color={staticColor}
                                        setColor={setStaticColor}
                                        changeColor={changeStaticColor}
                                    />
                                </div>
                            );
                        } else if (colorMode == 'gradient') {
                            return (
                                <div>
                                    <div className={styles.settingsContainer}>
                                        Grad Start Color:{' '}
                                        <ColorButton
                                            color={gradStartColor}
                                            setColor={setGradStartColor}
                                            changeColor={changeGradStartColor}
                                        />
                                    </div>
                                    <div className={styles.settingsContainer}>
                                        Grad End Color:{' '}
                                        <ColorButton
                                            color={gradEndColor}
                                            setColor={setGradEndColor}
                                            changeColor={changeGradEndColor}
                                        />
                                    </div>
                                </div>
                            );
                        }
                    })()}
                    <div className={styles.settingsContainer}>
                        <GradientButton />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='outline-danger'
                        onClick={() => setReset(!reset)}
                    >
                        Reset
                    </Button>
                    <Button
                        variant='outline-dark'
                        onClick={props.handleModalClose}
                    >
                        Close
                    </Button>
                    <Button variant='outline-dark' onClick={sendSettings}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
