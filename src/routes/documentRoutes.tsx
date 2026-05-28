import { Route } from 'react-router-dom';
import type { ComponentType } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { COURSE_SECTIONS } from '../course/courseData';

import Step1_01_Introduction from '../pages/documents/step1/01_Introduction/01_Introduction';
import Step1_02_Install from '../pages/documents/step1/02_Install/02_Install';
import Step1_03_MakeProject from '../pages/documents/step1/03_MakeProject/03_MakeProject';
import Step1_04_LED from '../pages/documents/step1/04_LED/04_LED';
import Step2_01_UartSend from '../pages/documents/step2/01_UartSend/01_UartSend';
import Step2_02_UartReceive from '../pages/documents/step2/02_UartReceive/02_UartReceive';
import Step2_03_UartReceiveIT from '../pages/documents/step2/03_UartReceiveIT/03_UartReceiveIT';
import Step2_04_Printf from '../pages/documents/step2/04_Printf/04_Printf';
import Step3_01_SignalAndAutodrop from '../pages/documents/step3/01_SignalAndAutodrop/01_SignalAndAutodrop';
import Step3_02_SBUSRead from '../pages/documents/step3/02_SBUSRead/02_SBUSRead';
import Step3_03_ServoMotor from '../pages/documents/step3/03_ServoMotor/03_ServoMotor';
import Step3_04_Infrared from '../pages/documents/step3/04_Infrared/04_Infrared';
import Step3_05_AutodropDesign from '../pages/documents/step3/05_AutodropDesign/05_AutodropDesign';
import Step4_01_SensorCommunication from '../pages/documents/step4/01_SensorCommunication/01_SensorCommunication';
import Step4_02_Ultrasonic from '../pages/documents/step4/02_Ultrasonic/02_Ultrasonic';
import Step4_03_ToF from '../pages/documents/step4/03_ToF/03_ToF';
import Step5_01_GetAccel from '../pages/documents/step5/01_GetAccel/01_GetAccel';
import Step5_02_AngleFromAccel from '../pages/documents/step5/02_AngleFromAccel/02_AngleFromAccel';
import Step5_03_AngleFromAccel from '../pages/documents/step5/03_AngleFromAccel/03_AngleFromAccel';
import Step5_04_AngleFromGyro from '../pages/documents/step5/04_AngleFromGyro/04_AngleFromGyro';
import Step5_05_AngleFromGyro from '../pages/documents/step5/05_AngleFromGyro/05_AngleFromGyro';
import Step5_06_Complementary from '../pages/documents/step5/06_Complementary/06_Complementary';
import Step5_07_Madgwick from '../pages/documents/step5/07_Madgwick/07_Madgwick';
import Step6_01_AboutStruct from '../pages/documents/step6/01_AboutStruct/01_AboutStruct';
import Step6_02_AboutClass from '../pages/documents/step6/02_AboutClass/02_AboutClass';
import Step6_03_IMU_Library from '../pages/documents/step6/03_IMU_Library/03_IMU_Library';
import Step6_04_Improve_Library_1 from '../pages/documents/step6/04_Improve_Library_1/04_Improve_Library_1';
import Step6_05_Improve_Library_2 from '../pages/documents/step6/05_Improve_Library_2/05_Improve_Library_2';
import Step6_06_EnumClass from '../pages/documents/step6/06_EnumClass/06_EnumClass';
import Step6_07_switch_i2c_spi from '../pages/documents/step6/07_switch_i2c_spi/07_switch_i2c_spi';
import Step6_08_BM1422AGMV from '../pages/documents/step6/08_BM1422AGMV/08_BM1422AGMV';
import Step7_01_ImportanceOfDesign from '../pages/documents/step7/01_ImportanceOfDesign/01_ImportanceOfDesign';
import Step7_02_FunctionAndSplit from '../pages/documents/step7/02_FunctionAndSplit/02_FunctionAndSplit';
import Step7_03_FunctionAndSplit from '../pages/documents/step7/03_FunctionAndSplit/03_FunctionAndSplit';
import Step7_04_MagicNumberEnum from '../pages/documents/step7/04_MagicNumberEnum/04_MagicNumberEnum';
import Step7_05_StateDesign1 from '../pages/documents/step7/05_StateDesign1/05_StateDesign1';
import Step7_06_StateDesign2 from '../pages/documents/step7/06_StateDesign2/06_StateDesign2';

const documentComponents: Record<string, ComponentType> = {
  '/Step1_01_introduction': Step1_01_Introduction,
  '/Step1_02_install': Step1_02_Install,
  '/Step1_03_makeproject': Step1_03_MakeProject,
  '/Step1_04_led': Step1_04_LED,
  '/Step2_01_UartSend': Step2_01_UartSend,
  '/Step2_02_UartReceive': Step2_02_UartReceive,
  '/Step2_03_UartReceiveIT': Step2_03_UartReceiveIT,
  '/Step2_04_Printf': Step2_04_Printf,
  '/Step3_01_SignalAndAutodrop': Step3_01_SignalAndAutodrop,
  '/Step3_02_SBUSRead': Step3_02_SBUSRead,
  '/Step3_03_ServoMotor': Step3_03_ServoMotor,
  '/Step3_04_Infrared': Step3_04_Infrared,
  '/Step3_05_AutodropDesign': Step3_05_AutodropDesign,
  '/Step4_01_SensorCommunication': Step4_01_SensorCommunication,
  '/Step4_02_Ultrasonic': Step4_02_Ultrasonic,
  '/Step4_03_ToF': Step4_03_ToF,
  '/Step5_01_GetAccel': Step5_01_GetAccel,
  '/Step5_02_AngleFromAccel': Step5_02_AngleFromAccel,
  '/Step5_03_AngleFromAccel': Step5_03_AngleFromAccel,
  '/Step5_04_AngleFromGyro': Step5_04_AngleFromGyro,
  '/Step5_05_AngleFromGyro': Step5_05_AngleFromGyro,
  '/Step5_06_Complementary': Step5_06_Complementary,
  '/Step5_07_Madgwick': Step5_07_Madgwick,
  '/Step6_01_AboutStruct': Step6_01_AboutStruct,
  '/Step6_02_AboutClass': Step6_02_AboutClass,
  '/Step6_03_IMU_Library': Step6_03_IMU_Library,
  '/Step6_04_Improve_Library_1': Step6_04_Improve_Library_1,
  '/Step6_05_Improve_Library_2': Step6_05_Improve_Library_2,
  '/Step6_06_EnumClass': Step6_06_EnumClass,
  '/Step6_07_switch_i2c_spi': Step6_07_switch_i2c_spi,
  '/Step6_08_BM1422AGMV': Step6_08_BM1422AGMV,
  '/Step7_01_ImportanceOfDesign': Step7_01_ImportanceOfDesign,
  '/Step7_02_FunctionAndSplit': Step7_02_FunctionAndSplit,
  '/Step7_03_FunctionAndSplit': Step7_03_FunctionAndSplit,
  '/Step7_04_MagicNumberEnum': Step7_04_MagicNumberEnum,
  '/Step7_05_StateDesign1': Step7_05_StateDesign1,
  '/Step7_06_StateDesign2': Step7_06_StateDesign2
};

export default function DocumentRoutes() {
  return COURSE_SECTIONS.flatMap(section =>
    section.lessons.map((lesson) => {
      const Component = documentComponents[lesson.path];

      return (
        <Route
          key={lesson.path}
          path={lesson.path}
          element={<ProtectedRoute><Component /></ProtectedRoute>}
        />
      );
    })
  );
}
