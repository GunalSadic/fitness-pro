import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Flame, CalendarClock, TrendingUp } from 'lucide-react-native';

export default function StatsScreen() {
  const [streakCount, setStreakCount] = useState(7);
  const checkedInToday = false;
  const progress = 60; // 60% of membership used

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Your progress</Text>
          <Text style={styles.title}>Dashboard</Text>
        </View>

        {/* Streak Card */}
        <View style={styles.streakCard}>
          <View style={styles.rowBetween}>
            <View>
              <View style={styles.streakBadge}>
                <Flame size={14} color="#f97316" />
                <Text style={styles.streakBadgeText}>Streak</Text>
              </View>
              <Text style={styles.cardSubtitle}>Current gym streak</Text>
              <Text style={styles.cardTitle}>{streakCount} <Text style={styles.cardTitleSub}>days</Text></Text>
            </View>
            <View style={styles.iconBig}>
              <Flame size={32} color="#f97316" />
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.checkInBtn, checkedInToday && { opacity: 0.5 }]} 
            onPress={() => setStreakCount(s => s + 1)}
          >
            <Text style={styles.checkInBtnText}>
              {checkedInToday ? "Checked in today ✓" : "Check in for today"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <View style={styles.statBoxHeader}>
              <TrendingUp size={14} color="#666" />
              <Text style={styles.statBoxTitle}>Best streak</Text>
            </View>
            <Text style={styles.statBoxValue}>12</Text>
            <Text style={styles.statBoxSub}>days</Text>
          </View>
          <View style={styles.statBox}>
            <View style={styles.statBoxHeader}>
              <CalendarClock size={14} color="#666" />
              <Text style={styles.statBoxTitle}>This month</Text>
            </View>
            <Text style={styles.statBoxValue}>22</Text>
            <Text style={styles.statBoxSub}>visits</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fafafa' },
  container: { padding: 20, gap: 20 },
  header: { paddingTop: 10, paddingBottom: 10 },
  subtitle: { fontSize: 14, color: '#666' },
  title: { fontSize: 24, fontWeight: '600', marginTop: 4 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  streakCard: { backgroundColor: '#fff7ed', borderColor: '#fed7aa', borderWidth: 1, padding: 24, borderRadius: 24 },
  streakBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffedd5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start', gap: 4 },
  streakBadgeText: { color: '#f97316', fontSize: 12, fontWeight: 'bold' },
  iconBig: { width: 56, height: 56, backgroundColor: '#ffedd5', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  cardSubtitle: { marginTop: 16, fontSize: 14, color: '#666' },
  cardTitle: { marginTop: 4, fontSize: 36, fontWeight: 'bold' },
  cardTitleSub: { fontSize: 16, color: '#888', fontWeight: 'normal' },
  checkInBtn: { backgroundColor: '#000', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  checkInBtnText: { color: '#fff', fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: 12 },
  statBox: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee', padding: 16, borderRadius: 16 },
  statBoxHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statBoxTitle: { fontSize: 12, color: '#666' },
  statBoxValue: { fontSize: 24, fontWeight: 'bold', marginTop: 8 },
  statBoxSub: { fontSize: 12, color: '#888' }
});