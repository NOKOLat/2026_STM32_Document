import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

import Step6_01_AboutStruct from '../../pages/documents/step6/01_AboutStruct/01_AboutStruct';
import Step6_02_AboutClass from '../../pages/documents/step6/02_AboutClass/02_AboutClass';
import Step6_03_IMU_Library from '../../pages/documents/step6/03_IMU_Library/03_IMU_Library';
import Step6_04_Improve_Library_1 from '../../pages/documents/step6/04_Improve_Library_1/04_Improve_Library_1';
import Step6_05_Improve_Library_2 from '../../pages/documents/step6/05_Improve_Library_2/05_Improve_Library_2';
import Step6_06_EnumClass from '../../pages/documents/step6/06_EnumClass/06_EnumClass';
import Step6_07_switch_i2c_spi from '../../pages/documents/step6/07_switch_i2c_spi/07_switch_i2c_spi';
import Step6_08_BM1422AGMV from '../../pages/documents/step6/08_BM1422AGMV/08_BM1422AGMV';

export default function Section6Routes() {
    return [
    <Route key="Step6_01_AboutStruct" path="/Step6_01_AboutStruct" element={<ProtectedRoute><Step6_01_AboutStruct /></ProtectedRoute>} />,
    <Route key="Step6_02_AboutClass" path="/Step6_02_AboutClass" element={<ProtectedRoute><Step6_02_AboutClass /></ProtectedRoute>} />,
    <Route key="Step6_03_IMU_Library" path="/Step6_03_IMU_Library" element={<ProtectedRoute><Step6_03_IMU_Library /></ProtectedRoute>} />,
    <Route key="Step6_04_Improve_Library_1" path="/Step6_04_Improve_Library_1" element={<ProtectedRoute><Step6_04_Improve_Library_1 /></ProtectedRoute>} />,
    <Route key="Step6_05_Improve_Library_2" path="/Step6_05_Improve_Library_2" element={<ProtectedRoute><Step6_05_Improve_Library_2 /></ProtectedRoute>} />,
    <Route key="Step6_06_EnumClass" path="/Step6_06_EnumClass" element={<ProtectedRoute><Step6_06_EnumClass /></ProtectedRoute>} />,
    <Route key="Step6_07_switch_i2c_spi" path="/Step6_07_switch_i2c_spi" element={<ProtectedRoute><Step6_07_switch_i2c_spi /></ProtectedRoute>} />,
    <Route key="Step6_08_BM1422AGMV" path="/Step6_08_BM1422AGMV" element={<ProtectedRoute><Step6_08_BM1422AGMV /></ProtectedRoute>} />,
    ];
}
