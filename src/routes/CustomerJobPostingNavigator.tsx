import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JobPostingBasicInfoScreen from '@src/screens/Customer/JobPosting/JobPostingBasicInfoScreen';
import JobPostingAIResultsScreen from '@src/screens/Customer/JobPosting/JobPostingAIResultsScreen';

export type CustomerJobPostingParamList = {
  JobPostingBasicInfo: { description: string; attachments: any[] };
  JobPostingAIResults: { description: string; attachments: any[] };
};

const Stack = createNativeStackNavigator<CustomerJobPostingParamList>();

export function CustomerJobPostingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="JobPostingBasicInfo" 
        component={JobPostingBasicInfoScreen} 
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen 
        name="JobPostingAIResults" 
        component={JobPostingAIResultsScreen} 
        options={{ animation: 'slide_from_right' }}
      /> 
    </Stack.Navigator>
  );
}
