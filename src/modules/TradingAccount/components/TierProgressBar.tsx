/**
 * TierProgressBar
 *
 * Displays a horizontal progress bar showing the user's progress
 * toward the next verification tier.
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '@lmb-it/kitsconcerto';

export interface TierProgressBarProps {
  /** Current tier display name */
  currentTierName: string;
  /** Badge color for the progress fill */
  badgeColor: string;
  /** 0–100 percentage */
  progress: number;
  /** e.g. "3 of 4 documents verified" */
  progressLabel: string;
  /** Show tier name above the bar */
  showLabel?: boolean;
}

export const TierProgressBar: React.FC<TierProgressBarProps> = ({
  currentTierName,
  badgeColor,
  progress,
  progressLabel,
  showLabel = true,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel={`${currentTierName}, ${Math.round(clampedProgress)}% progress. ${progressLabel}`}
      accessibilityRole="progressbar">
      {showLabel && (
        <Text fontSize={14} fontWeight="700" color="text-primary" mb={8}>
          {currentTierName}
        </Text>
      )}

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress}%`,
              backgroundColor: badgeColor,
            },
          ]}
        />
      </View>

      <View style={styles.labelRow}>
        <Text fontSize={12} color="text-subtle">
          {progressLabel}
        </Text>
        <Text fontSize={12} fontWeight="600" color="text-primary">
          {Math.round(clampedProgress)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  track: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
});
