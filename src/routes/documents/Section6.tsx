import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

import Step6_01_AboutClass from '../../pages/documents/step6/01_AboutClass/01_AboutClass';
import Step6_02_AboutClass from '../../pages/documents/step6/02_AboutClass/02_AboutClass';
import Step6_03_IMU_Library from '../../pages/documents/step6/03_IMU_Library/03_IMU_Library';
import Step6_04_I2C_SPI_1 from '../../pages/documents/step6/04_I2C_SPI_1/04_I2C_SPI_1';
import Step6_05_I2C_SPI_1 from '../../pages/documents/step6/05_I2C_SPI_1/05_I2C_SPI_1';
import Step6_06_BM1422AGMV from '../../pages/documents/step6/06_BM1422AGMV/06_BM1422AGMV';
import Step6_07_BM1422AGMV from '../../pages/documents/step6/07_BM1422AGMV/07_BM1422AGMV';
import Step6_08_ICM42688P from '../../pages/documents/step6/08_ICM42688P/08_ICM42688P';

export default function Section6Routes() {
    return [
    <Route key="Step6_01_AboutClass" path="/Step6_01_AboutClass" element={<ProtectedRoute><Step6_01_AboutClass /></ProtectedRoute>} />,
    <Route key="Step6_02_AboutClass" path="/Step6_02_AboutClass" element={<ProtectedRoute><Step6_02_AboutClass /></ProtectedRoute>} />,
    <Route key="Step6_03_IMU_Library" path="/Step6_03_IMU_Library" element={<ProtectedRoute><Step6_03_IMU_Library /></ProtectedRoute>} />,
    <Route key="Step6_04_I2C_SPI_1" path="/Step6_04_I2C_SPI_1" element={<ProtectedRoute><Step6_04_I2C_SPI_1 /></ProtectedRoute>} />,
    <Route key="Step6_05_I2C_SPI_1" path="/Step6_05_I2C_SPI_1" element={<ProtectedRoute><Step6_05_I2C_SPI_1 /></ProtectedRoute>} />,
    <Route key="Step6_06_BM1422AGMV" path="/Step6_06_BM1422AGMV" element={<ProtectedRoute><Step6_06_BM1422AGMV /></ProtectedRoute>} />,
    <Route key="Step6_07_BM1422AGMV" path="/Step6_07_BM1422AGMV" element={<ProtectedRoute><Step6_07_BM1422AGMV /></ProtectedRoute>} />,
    <Route key="Step6_08_ICM42688P" path="/Step6_08_ICM42688P" element={<ProtectedRoute><Step6_08_ICM42688P /></ProtectedRoute>} />,
    ];
}
