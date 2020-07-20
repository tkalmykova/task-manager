import 'src/application.css';

import 'material-design-lite/material.js';

require('@rails/ujs').start();
require('@rails/activestorage').start();
require('channels');

import WebpackerReact from 'webpacker-react';
import App from 'App';
import PasswordResetForm from 'components/PasswordResetForm';
import PasswordUpdateForm from 'components/PasswordUpdateForm';

WebpackerReact.setup({ App, PasswordResetForm, PasswordUpdateForm });
