import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Popover,
  Pressable,
  Text,
  View,
} from 'native-base';
import {
  Boxes,
  Truck,
  ArchiveRestore,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react-native';
import { KKpolData } from '../../Universal/API/Context-API/AppProvider';
import { Platform, StyleSheet } from 'react-native';
import { webFont } from '../../Universal/API/API';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

interface Props {
  ostatki: KKpolData['ostatki'];
  scaleAll: number;
  compact?: boolean;
}

const OstatkiDisplay: React.FC<Props> = ({ ostatki, scaleAll, compact = false }) => {
  if(!ostatki)
    return null
  const allEntries = [
    {
      key: 'FreeSklad',
      label: 'Свободно на складе',
      value: parseFloat(ostatki.FreeSklad),
      icon: Boxes,
    },
    {
      key: 'VPutiFree',
      label: 'В пути (свободно)',
      value: parseFloat(ostatki.VPutiFree),
      icon: Truck,
    },
    {
      key: 'ReservSklad',
      label: 'Резерв на складе',
      value: parseFloat(ostatki.ReservSklad),
      icon: ArchiveRestore,
    },
    {
      key: 'VPutiReserv',
      label: 'В пути (резерв)',
      value: parseFloat(ostatki.VPutiReserv),
      icon: ShieldCheck,
    },
  ];

  const entries = allEntries.filter(e => e.value > 0);
  if (!entries || entries.length === 0) return null;

  // ---------------- COMPACT ---------------- //
  if (compact) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleHoverIn = () => {
      setIsHovered(true);
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
        closeTimeout.current = null;
      }
      setIsOpen(true);
    };

    const handleHoverOut = () => {
      setIsHovered(false);
      closeTimeout.current = setTimeout(() => {
        setIsOpen(false);
      }, 400);
    };

    const Icon = entries[0].icon;
    const styles = getStyles(scaleAll);

    useEffect(() => {
      if (Platform.OS !== 'web') return;
    
      const handleClickOutside = (e: MouseEvent) => {
        // @ts-ignore: target may be undefined/null
        if (!e.target?.closest('.popover-trigger') && !e.target?.closest('.native-base__popover-content')) {
          setIsOpen(false);
        }
      };
    
      document.addEventListener('mousedown', handleClickOutside);
    
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={triggerProps => (
          <Pressable
            className="popover-trigger"
            {...triggerProps}
            onPress={() => {setIsOpen(!isOpen);}}
            onHoverIn={handleHoverIn}
            onHoverOut={handleHoverOut}
          >
            <View style={[styles.rowCompact, isHovered && styles.shadow]}>
              <Icon color="#2e2e2e" size={16 * scaleAll} strokeWidth={2} />
              <Text style={styles.labelCompact}>{entries[0].value}</Text>
              {entries && entries.length > 1 && (
                <ChevronDown color="#0A84FF" size={14 * scaleAll} />
              )}
            </View>
          </Pressable>
        )}
        placement="bottom right"
      >
        <Popover.Content
          onHoverIn={handleHoverIn}
          onHoverOut={handleHoverOut}
          borderRadius="md"
          backgroundColor={'white'}
          p="2"
        >
          {entries && entries.map(entry => {
            const EntryIcon = entry.icon;
            return (
              <View key={entry.key} style={styles.popoverRow}>
                <EntryIcon color="#2e2e2e" size={16 * scaleAll} strokeWidth={2} />
                <Text style={styles.labelPopover}>{entry.label}</Text>
                <Text style={styles.value}>{entry.value}</Text>
              </View>
            );
          })}
        </Popover.Content>
      </Popover>
    );
  }

  // ---------------- FULL ---------------- //
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useSharedValue(0);
  const rotate = useSharedValue(0);

  const toggleExpand = () => {
    const next = !expanded;
    setExpanded(next);
    animatedHeight.value = withTiming(next ? 1 : 0, { duration: 300 });
    rotate.value = withTiming(next ? 1 : 0, { duration: 300 });
  };

  const Icon = entries[0].icon;
  const showToggle = entries && entries.length > 1;

  const styles = getStyles(scaleAll);

  const heightStyle = useAnimatedStyle(() => ({
    height: interpolate(
      animatedHeight.value,
      [0, 1],
      [0, (entries.length - 1) * 34 * scaleAll]
    ),
    opacity: animatedHeight.value,
  }));

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(rotate.value, [0, 1], [0, 180])}deg` }],
  }));

  return (
    <Box style={styles.container} shadow={4}>
      <Pressable 
        className="popover-trigger"
      onPress={toggleExpand} disabled={!showToggle}>
        <View style={styles.row}>
          <Icon color="#2e2e2e" size={20 * scaleAll} strokeWidth={2} />
          <Text style={styles.label}>{entries[0].label}</Text>
          <Text style={styles.value}>{entries[0].value}</Text>
          {showToggle && (
            <Animated.View style={[styles.arrow, rotateStyle]}>
              <ChevronDown color="#0A84FF" size={18 * scaleAll} />
            </Animated.View>
          )}
        </View>
      </Pressable>

      {showToggle && (
        <Animated.View style={[styles.expandable, heightStyle]}>
          {entries.slice(1).map(entry => {
            const EntryIcon = entry.icon;
            return (
              <View key={entry.key} style={styles.row}>
                <EntryIcon color="#2e2e2e" size={20 * scaleAll} strokeWidth={2} />
                <Text style={styles.label}>{entry.label}</Text>
                <Text style={styles.value}>{entry.value}</Text>
              </View>
            );
          })}
        </Animated.View>
      )}
    </Box>
  );
};

// ---------------- STYLES ---------------- //

const getStyles = (scale: number) => React.useMemo(() =>
  StyleSheet.create({
    container: {
      borderRadius: 12 * scale,
      padding: 12 * scale,
      backgroundColor: '#fff',
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8 * scale,
      height: 34 * scale,
    },
    rowCompact: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 10 * scale,
      borderWidth: 0.5,
      borderStyle: 'dashed',
      paddingHorizontal: 8 * scale,
      paddingVertical: 4 * scale,
      gap: 6 * scale,
    },
    label: {
      flex: 1,
      fontSize: 14 * scale,
      fontFamily: webFont('Inter'),
      color: '#333',
      fontWeight: '500',
    },
    labelCompact: {
      fontSize: 12 * scale,
      fontFamily: webFont('Inter'),
      color: '#0A84FF',
      fontWeight: '600',
    },
    labelPopover: {
      flex: 1,
      fontSize: 13 * scale,
      fontFamily: webFont('Inter'),
      color: '#333',
      fontWeight: '500',
    },
    value: {
      fontSize: 13 * scale,
      fontFamily: webFont('Inter'),
      fontWeight: '700',
      color: '#0A84FF',
    },
    popoverRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8 * scale,
      paddingVertical: 4 * scale,
    },
    arrow: {
      width: 24 * scale,
      height: 24 * scale,
      justifyContent: 'center',
      alignItems: 'center',
    },
    expandable: {
      overflow: 'hidden',
    },
    shadow: {
      shadowColor: 'black',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
  }), [scale])

export default React.memo(OstatkiDisplay);
