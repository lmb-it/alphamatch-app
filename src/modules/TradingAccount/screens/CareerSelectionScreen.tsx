import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Flex, Text, Heading, Button, useLanguage, useKitsTheme} from '@lmb-it/kitsconcerto';
import {Search, Briefcase, ChevronRight} from 'lucide-react-native';
import type {TradingAccountCreationParamList} from '@src/routes/TradingAccountCreationNavigator';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
// Assuming selectCareers provides a list of objects like { identifier, title, category, businessModel }
import {selectCareers, selectCareersLoading, tradingAccountActions} from '@src/modules/TradingAccount';
import type {ICareerOption} from '../models/tradingAccount.types';

type Nav = NativeStackNavigationProp<TradingAccountCreationParamList>;

export default function CareerSelectionScreen() {
  const {t} = useLanguage();
  const {resolveToken} = useKitsTheme();
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch();
  const primaryColor = resolveToken('primary');

  const allCareers = useSelector(selectCareers) || [];
  const careersLoading = useSelector(selectCareersLoading);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareer, setSelectedCareer] = useState<ICareerOption | null>(null);

  // Fetch careers on mount
  useEffect(() => {
    dispatch(tradingAccountActions.fetchCareers());
  }, [dispatch]);

  // Group careers by category
  const filteredCareers = useMemo(() => {
    let list = allCareers;
    if (searchQuery) {
      list = list.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    const grouped = list.reduce((acc, career) => {
      const cat = career.categoryName || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(career);
      return acc;
    }, {} as Record<string, typeof list>);

    return grouped;
  }, [allCareers, searchQuery]);

  const handleSelect = (career: ICareerOption) => {
    setSelectedCareer(career);
  };

  const handleConfirm = () => {
    if (!selectedCareer) return;
    dispatch(tradingAccountActions.selectCareer(selectedCareer.identifier));
    // The UML specifies routing to the Career Confirmation screen next to confirm Pro/Flex before questions
    navigation.navigate('TACareerConfirmation');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Flex flex={1} flexDirection="column" backgroundColor="bg">
        <View style={styles.header}>
          <Heading as="h2" bold color="text-primary" style={styles.heading}>
            {t('trading.career.selectYour')}{' '}
            <Heading as="h2" bold color="primary">{t('trading.career.career')}</Heading>
          </Heading>
          
          <View style={styles.searchContainer}>
            <Search color="#9CA3AF" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder={t('trading.career.searchPlaceholder')}
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              accessible
              accessibilityLabel="Search careers"
              accessibilityHint="Type to filter the list of available careers"
            />
          </View>
        </View>

        <ScrollView style={styles.listContainer} contentContainerStyle={{paddingBottom: 100}}>
          {Object.entries(filteredCareers).map(([category, careers]) => (
            <View key={category} style={styles.categorySection}>
              <Text fontSize={16} fontWeight="700" color="text-primary" mb={12}>
                {category}
              </Text>
              
              {careers.map((career) => {
                const isSelected = selectedCareer?.identifier === career.identifier;
                const isPro = career.businessModel === 'pro';
                
                return (
                  <TouchableOpacity
                    key={career.identifier}
                    style={[
                      styles.careerCard,
                      isSelected && {borderColor: primaryColor, backgroundColor: `${primaryColor}05`}
                    ]}
                    activeOpacity={0.7}
                    onPress={() => handleSelect(career)}
                    accessible
                    accessibilityRole="button"
                    accessibilityLabel={`${career.title}, ${isPro ? 'Alpha Pro' : 'Alpha Flex'}`}
                    accessibilityState={{selected: isSelected}}>
                    <View style={styles.iconCircle}>
                      <Briefcase color={isSelected ? primaryColor : '#6B7280'} size={20} />
                    </View>
                    
                    <View style={styles.cardContent}>
                      <Text fontSize={16} fontWeight="600" color="text-primary">
                        {career.title}
                      </Text>
                      <View style={styles.badgeRow}>
                        <View style={[styles.badge, isPro ? styles.badgePro : styles.badgeFlex]}>
                          <Text fontSize={11} fontWeight="700" color={isPro ? '#B45309' : '#1D4ED8'}>
                            {isPro ? t('trading.career.alphaPro') : t('trading.career.alphaFlex')}
                          </Text>
                        </View>
                      </View>
                    </View>
                    
                    <ChevronRight color="#D1D5DB" size={20} />
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {Object.keys(filteredCareers).length === 0 && (
            <Text textAlign="center" color="text-subtle" mt={40}>
              {careersLoading ? t('trading.career.loadingCareers') : `${t('trading.career.noCareersFound')} "${searchQuery}"`}
            </Text>
          )}
        </ScrollView>

        {selectedCareer && (
          <View style={styles.bottomBar}>
            <Button
              label={t('trading.career.thisIsMyCareer')}
              severity="brand"
              w="full"
              onClick={handleConfirm}
            />
          </View>
        )}
      </Flex>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  heading: {
    fontSize: 26,
    lineHeight: 34,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'System',
    fontSize: 15,
    color: '#111827',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categorySection: {
    marginTop: 24,
  },
  careerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgePro: {
    backgroundColor: '#FEF3C7', // Amber light
  },
  badgeFlex: {
    backgroundColor: '#DBEAFE', // Blue light
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    // shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 10,
  },
});
