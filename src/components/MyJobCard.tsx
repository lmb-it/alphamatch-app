import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface MyJobCardProps {
  dateRange: string;
  title: string;
  subtitle?: string;
  price?: string;
  statusPill?: {
    label: string;
    variant: 'success' | 'info' | 'warning' | 'default';
  };
  primaryAction?: {
    label: string;
    onPress: () => void;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
  style?: StyleProp<ViewStyle>;
}

export const MyJobCard: React.FC<MyJobCardProps> = ({
  dateRange,
  title,
  subtitle,
  price,
  statusPill,
  primaryAction,
  secondaryAction,
  style,
}) => {
  const renderStatusPill = () => {
    if (!statusPill) return null;

    let bgColor = '#F3F4F6';
    let textColor = '#6B7280';

    if (statusPill.variant === 'success') {
      bgColor = '#E5F6E5'; // Light green approx
      textColor = '#10B981';
    } else if (statusPill.variant === 'info') {
      bgColor = '#EBF5FF'; // Light blue approx
      textColor = '#3B82F6';
    } else if (statusPill.variant === 'warning') {
      bgColor = '#FEF3C7';
      textColor = '#F59E0B';
    }

    return (
      <View style={[styles.pill, {backgroundColor: bgColor}]}>
        <Text style={[styles.pillText, {color: textColor}]}>
          {statusPill.label}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.card, style]}>
      {/* Top Section: Date & Pill */}
      <View style={styles.topRow}>
        <Text style={styles.dateText}>{dateRange}</Text>
        {renderStatusPill()}
      </View>

      <View style={styles.divider} />

      {/* Middle Section: Details */}
      <View style={styles.detailsRow}>
        <View style={styles.detailsLeft}>
          <Text style={styles.titleText}>{title}</Text>
          {!!subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
        </View>
        {!!price && (
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{price}</Text>
          </View>
        )}
      </View>

      {/* Bottom Section: Buttons (if any) */}
      {(primaryAction || secondaryAction) && (
        <>
          <View style={styles.divider} />
          <View style={styles.actionsRow}>
            {secondaryAction && (
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={secondaryAction.onPress}
                activeOpacity={0.8}>
                <Text style={styles.btnSecondaryText}>
                  {secondaryAction.label}
                </Text>
              </TouchableOpacity>
            )}

            {primaryAction && (
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={primaryAction.onPress}
                activeOpacity={0.8}>
                <Text style={styles.btnPrimaryText}>{primaryAction.label}</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F9FAFC',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    flexDirection: 'column',
    gap: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  dateText: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#75808E',
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  pillText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  detailsLeft: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
    paddingRight: 16, // Space before price
  },
  titleText: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#263238',
  },
  subtitleText: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#75808E',
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  priceText: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: '#263238',
  },
  actionsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  btnSecondary: {
    flex: 1,
    height: 38,
    backgroundColor: '#F9FAFC',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSecondaryText: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 14,
    color: '#263238',
  },
  btnPrimary: {
    flex: 1,
    height: 38,
    backgroundColor: '#00A8B1',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrimaryText: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
