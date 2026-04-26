import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Flame, CalendarClock, TrendingUp } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { authService, StatsDto } from '../services/AuthService';

export default function StatsScreen() {
  const { token } = useAuth();
  const [stats, setStats] = useState<StatsDto | null>(null);

  useEffect(() => {
    if (!token) return;
    authService.getStats(token).then(setStats).catch(console.error);
  }, [token]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Your progress</Text>
          <Text style={styles.title}>Dashboard</Text>
        </View>

        <View style={styles.streakCard}>
          <View style={styles.rowBetween}>
            <View>
              <View style={styles.streakBadge}>
                <Flame size={14} color="#f97316" />
                <Text style={styles.streakBadgeText}>Streak</Text>
              </View>
              <Text style={styles.cardSubtitle}>Current gym streak</Text>
              {stats === null ? (
                <ActivityIndicator style={{ marginTop: 8 }} color="#f97316" />
              ) : (
                <Text style={styles.cardTitle}>
                  {stats.currentStreak} <Text style={styles.cardTitleSub}>days</Text>
                </Text>
              )}
            </View>
            <View style={styles.iconBig}>
              <Flame size={32} color="#f97316" />
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <View style={styles.statBoxHeader}>
              <TrendingUp size={14} color="#666" />
              <Text style={styles.statBoxTitle}>Best streak</Text>
            </View>
            {stats === null ? (
              <ActivityIndicator style={{ marginTop: 8 }} color="#888" />
            ) : (
              <>
                <Text style={styles.statBoxValue}>{stats.bestStreak}</Text>
                <Text style={styles.statBoxSub}>days</Text>
              </>
            )}
          </View>
          <View style={styles.statBox}>
            <View style={styles.statBoxHeader}>
              <CalendarClock size={14} color="#666" />
              <Text style={styles.statBoxTitle}>This month</Text>
            </View>
            {stats === null ? (
              <ActivityIndicator style={{ marginTop: 8 }} color="#888" />
            ) : (
              <>
                <Text style={styles.statBoxValue}>{stats.visitsThisMonth}</Text>
                <Text style={styles.statBoxSub}>visits</Text>
              </>
            )}
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
  statsRow: { flexDirection: 'row', gap: 12 },
  statBox: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee', padding: 16, borderRadius: 16 },
  statBoxHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statBoxTitle: { fontSize: 12, color: '#666' },
  statBoxValue: { fontSize: 24, fontWeight: 'bold', marginTop: 8 },
  statBoxSub: { fontSize: 12, color: '#888' },
});
