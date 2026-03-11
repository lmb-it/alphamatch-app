import React, {useState} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Flex, Box, Text, Button, Heading, useKitsTheme, useLanguage} from '@lmb-it/kitsconcerto';
import {CheckCircle2, ArrowRight, GitMerge, User, Users, DollarSign, Gavel} from 'lucide-react-native';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {CustomerJobPostingParamList} from '@src/routes/CustomerJobPostingNavigator';

type Props = NativeStackScreenProps<CustomerJobPostingParamList, 'JobPostingAIResults'>;

type DemoState = 
  | 'SINGLE_PRO_STANDARD'
  | 'SINGLE_PRO_AUCTION'
  | 'SINGLE_PRO_CHOICE'
  | 'SINGLE_FLEX'
  | 'MULTI_PRO_CHOICE';

export default function JobPostingAIResultsScreen({navigation, route}: Props) {
  const {resolveToken} = useKitsTheme();
  const {t} = useLanguage();
  const primaryColor = resolveToken('primary');

  // DEV MOCK STATE: We cycle through the 5 requested branches for the client to preview
  const [demoState, setDemoState] = useState<DemoState>('MULTI_PRO_CHOICE');

  // Selection state for generic branch choices
  const [pricingChoice, setPricingChoice] = useState<'standard' | 'auction' | null>(null);
  const [teamChoice, setTeamChoice] = useState<'manager' | 'leader' | null>(null);

  const handleContinue = () => {
    console.log('Continuing with logic:', { demoState, pricingChoice, teamChoice });
    // TODO: Final Submission -> User matches logic backend
  };

  const renderPricingChoice = () => (
    <Box mt={24}>
      <Text fontSize={16} fontWeight="700" color="text-primary" mb={12}>
        {t('jobs.howToHire')}
      </Text>
      <Flex flexDirection="row" gap={12}>
        <TouchableOpacity 
          style={[styles.choiceCard, pricingChoice === 'standard' && {borderColor: primaryColor}]} 
          onPress={() => setPricingChoice('standard')}
          activeOpacity={0.7}
        >
          <DollarSign color={pricingChoice === 'standard' ? primaryColor : '#9CA3AF'} size={24} />
          <Text fontSize={14} fontWeight="600" color={pricingChoice === 'standard' ? 'primary' : 'text-secondary'} mt={8}>
            {t('jobs.standardQuote')}
          </Text>
          <Text fontSize={12} color="text-secondary" mt={4} textAlign="center">
            {t('jobs.standardQuoteDesc')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.choiceCard, pricingChoice === 'auction' && {borderColor: primaryColor}]} 
          onPress={() => setPricingChoice('auction')}
          activeOpacity={0.7}
        >
          <Gavel color={pricingChoice === 'auction' ? primaryColor : '#9CA3AF'} size={24} />
          <Text fontSize={14} fontWeight="600" color={pricingChoice === 'auction' ? 'primary' : 'text-secondary'} mt={8}>
            {t('jobs.reverseAuction')}
          </Text>
          <Text fontSize={12} color="text-secondary" mt={4} textAlign="center">
            {t('jobs.reverseAuctionDesc')}
          </Text>
        </TouchableOpacity>
      </Flex>
    </Box>
  );

  const renderContent = () => {
    switch(demoState) {
      case 'SINGLE_PRO_STANDARD':
        return (
          <Box mt={24}>
             <Flex flexDirection="row" alignItems="center" mb={16}>
                <Box p={8} backgroundColor="#E0F7F8" borderRadius={8} mr={12}>
                   <CheckCircle2 color={primaryColor} size={24} />
                </Box>
                <Box flex={1}>
                  <Text fontSize={16} fontWeight="700" color="text-primary">{t('jobs.matchedProStandard')}</Text>
                  <Text fontSize={14} color="text-secondary" mt={2}>{t('jobs.matchedProStandardDesc')}</Text>
                </Box>
             </Flex>
             <Box p={16} backgroundColor="#F9FAFB" borderRadius={12} borderWidth={1} borderColor="#E5E7EB">
               <Text fontSize={14} color="text-primary" lineHeight={22}>
                 {t('jobs.matchedProStandardExplainer')}
               </Text>
             </Box>
          </Box>
        );

      case 'SINGLE_PRO_AUCTION':
        return (
          <Box mt={24}>
             <Flex flexDirection="row" alignItems="center" mb={16}>
                <Box p={8} backgroundColor="#E0F7F8" borderRadius={8} mr={12}>
                   <Gavel color={primaryColor} size={24} />
                </Box>
                <Box flex={1}>
                  <Text fontSize={16} fontWeight="700" color="text-primary">{t('jobs.matchedProAuction')}</Text>
                  <Text fontSize={14} color="text-secondary" mt={2}>{t('jobs.matchedProAuctionDesc')}</Text>
                </Box>
             </Flex>
             <Box p={16} backgroundColor="#F9FAFB" borderRadius={12} borderWidth={1} borderColor="#E5E7EB">
               <Text fontSize={14} color="text-primary" lineHeight={22}>
                 {t('jobs.matchedProAuctionExplainer')}
               </Text>
             </Box>
          </Box>
        );

      case 'SINGLE_PRO_CHOICE':
        return (
          <Box mt={24}>
            <Text fontSize={16} fontWeight="700" color="text-primary" mb={8}>{t('jobs.optionsAvailablePro')}</Text>
            <Text fontSize={14} color="text-secondary" mb={16}>{t('jobs.optionsAvailableProDesc')}</Text>
            {renderPricingChoice()}
          </Box>
        );

      case 'SINGLE_FLEX':
        return (
          <Box mt={24}>
             <Flex flexDirection="row" alignItems="center" mb={16}>
                <Box p={8} backgroundColor="#F3F4F6" borderRadius={8} mr={12}>
                   <Users color="#4B5563" size={24} />
                </Box>
                <Box flex={1}>
                  <Text fontSize={16} fontWeight="700" color="text-primary">{t('jobs.matchedFlex')}</Text>
                  <Text fontSize={14} color="text-secondary" mt={2}>{t('jobs.matchedFlexDesc')}</Text>
                </Box>
             </Flex>
             <Box p={16} backgroundColor="#F9FAFB" borderRadius={12} borderWidth={1} borderColor="#E5E7EB">
               <Text fontSize={14} color="text-primary" lineHeight={22}>
                 {t('jobs.matchedFlexExplainer')}
               </Text>
             </Box>
          </Box>
        );

      case 'MULTI_PRO_CHOICE':
        return (
          <Box mt={24}>
            <Flex flexDirection="row" alignItems="center" mb={16}>
                <Box p={8} backgroundColor="#E0F7F8" borderRadius={8} mr={12}>
                   <GitMerge color={primaryColor} size={24} />
                </Box>
                <Box flex={1}>
                  <Text fontSize={16} fontWeight="700" color="text-primary">{t('jobs.complexProject')}</Text>
                  <Text fontSize={14} color="text-secondary" mt={2}>{t('jobs.requiredTrades')}</Text>
                </Box>
            </Flex>

            {renderPricingChoice()}

            <Box mt={32}>
              <Text fontSize={16} fontWeight="700" color="text-primary" mb={12}>
                {t('jobs.howToProceed')}
              </Text>
              <Text fontSize={14} color="text-secondary" mb={16}>
                {t('jobs.multiTradeQuestion')}
              </Text>
              
              <Flex gap={12}>
                <TouchableOpacity 
                   style={[styles.rowChoice, teamChoice === 'manager' && {borderColor: primaryColor}]} 
                   onPress={() => setTeamChoice('manager')}
                   activeOpacity={0.7}
                >
                   <User color={teamChoice === 'manager' ? primaryColor : '#9CA3AF'} size={24} />
                   <Box flex={1} ml={12}>
                     <Text fontSize={15} fontWeight="600" color="text-primary">{t('jobs.manageTradesTitle')}</Text>
                     <Text fontSize={13} color="text-secondary" mt={2}>{t('jobs.manageTradesDesc')}</Text>
                   </Box>
                </TouchableOpacity>

                <TouchableOpacity 
                   style={[styles.rowChoice, teamChoice === 'leader' && {borderColor: primaryColor}]} 
                   onPress={() => setTeamChoice('leader')}
                   activeOpacity={0.7}
                >
                   <Users color={teamChoice === 'leader' ? primaryColor : '#9CA3AF'} size={24} />
                   <Box flex={1} ml={12}>
                     <Text fontSize={15} fontWeight="600" color="text-primary">{t('jobs.leadContractorTitle')}</Text>
                     <Text fontSize={13} color="text-secondary" mt={2}>{t('jobs.leadContractorDesc')}</Text>
                   </Box>
                </TouchableOpacity>
              </Flex>
            </Box>
          </Box>
        );
    }
  };

  const getContinueDisabled = () => {
    if (demoState === 'SINGLE_PRO_CHOICE' && !pricingChoice) return true;
    if (demoState === 'MULTI_PRO_CHOICE' && (!pricingChoice || !teamChoice)) return true;
    return false;
  };

  return (
    <AlphaLayout>
      <Flex flex={1} flexDirection="column" backgroundColor="bg">
        <ScrollView contentContainerStyle={styles.container}>
          
          {/* Developer Mocking Header for QA */}
          {__DEV__ && (
            <Box mb={24} p={12} backgroundColor="#FFFBEB" borderRadius={8} borderWidth={1} borderColor="#FDE68A">
              <Text fontSize={12} fontWeight="700" color="#D97706" mb={8}>DEV UI PREVIEW CONTROLS:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Flex flexDirection="row" gap={8}>
                  {['SINGLE_PRO_STANDARD', 'SINGLE_PRO_AUCTION', 'SINGLE_PRO_CHOICE', 'SINGLE_FLEX', 'MULTI_PRO_CHOICE'].map((s) => (
                    <TouchableOpacity key={s} onPress={() => setDemoState(s as DemoState)} style={styles.devBtn}>
                      <Text fontSize={10} color={demoState === s ? primaryColor : '#4B5563'}>{s.replace(/_/g, ' ')}</Text>
                    </TouchableOpacity>
                  ))}
                </Flex>
              </ScrollView>
            </Box>
          )}

          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {t('jobs.analyzingRequest')} <Sparkles color={primaryColor} size={20} style={{marginLeft: 8}}/>
          </Heading>

          <Text fontSize={15} color="text-secondary" mt={12} lineHeight={22}>
            {t('jobs.analyzingSubtitle')}
          </Text>

          {renderContent()}

        </ScrollView>
        <Box p={16} style={styles.footer}>
          <Button 
            label={t('jobs.publishRequest')}
            severity="brand" 
            w="full" 
            onClick={handleContinue}
            disabled={getContinueDisabled()}
          />
        </Box>
      </Flex>
    </AlphaLayout>
  );
}

// Ensure Sparkles is imported
import {Sparkles} from 'lucide-react-native';

const styles = StyleSheet.create({
  container: {
    padding: 22,
    paddingTop: 32,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 26,
    lineHeight: 34,
  },
  choiceCard: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  rowChoice: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  devBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  }
});
