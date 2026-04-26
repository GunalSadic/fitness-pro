import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  ScrollView, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { Target } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { authService, AchievementDto } from '../services/AuthService';

const GOAL_HINT: Record<number, string> = {
  1: '1 day — just getting started',
  2: '2 days — building the habit',
  3: '3 days — solid routine',
  4: '4 days — serious commitment',
  5: '5 days — dedicated athlete',
  6: '6 days — almost daily grind',
  7: '7 days — absolute beast mode 💪',
};

export default function GoalsScreen() {
  const { token } = useAuth();
  const [goal, setGoal] = useState<number>(3);
  const [achievements, setAchievements] = useState<AchievementDto[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      authService.getGoal(token),
      authService.getAchievements(token),
    ])
      .then(([goalData, achievementsData]) => {
        setGoal(goalData.weeklyGoal);
        setAchievements(achievementsData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  const handleGoalChange = (days: number) => {
    setGoal(days);
    if (!token) return;
    authService.setGoal(token, days).catch(console.error);
  };

  const unlocked = achievements?.filter(a => a.isUnlocked).length ?? 0;
  const total = achievements?.length ?? 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.header}>
          <Text style={styles.subtitle}>Track your progress</Text>
          <Text style={styles.title}>Goals & Achievements</Text>
        </View>

        {/* Weekly goal card */}
        <View style={styles.goalCard}>
          <View style={styles.goalCardTop}>
            <View>
              <View style={styles.goalBadge}>
                <Target size={13} color="#16a34a" />
                <Text style={styles.goalBadgeText}>Weekly Goal</Text>
              </View>
              <Text style={styles.goalSubtitle}>Days per week target</Text>
            </View>
            <View style={styles.iconCircleLarge}>
              <Target size={26} color="#16a34a" />
            </View>
          </View>

          <View style={styles.daySelector}>
            {[1, 2, 3, 4, 5, 6, 7].map(day => (
              <TouchableOpacity
                key={day}
                style={[styles.dayBtn, goal === day && styles.dayBtnActive]}
                onPress={() => handleGoalChange(day)}
              >
                <Text style={[styles.dayBtnText, goal === day && styles.dayBtnTextActive]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.goalHint}>{GOAL_HINT[goal]}</Text>
        </View>

        {/* Achievements header */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {achievements !== null && (
            <Text style={styles.sectionCounter}>{unlocked}/{total}</Text>
          )}
        </View>

        {loading ? (
          <ActivityIndicator color="#000" style={{ marginTop: 20 }} />
        ) : (
          <View style={styles.grid}>
            {achievements?.map(a => (
              <View
                key={a.id}
                style={[styles.achievementCard, !a.isUnlocked && styles.achievementCardLocked]}
              >
                <View style={[styles.iconCircle, !a.isUnlocked && styles.iconCircleLocked]}>
                  <Text style={styles.iconEmoji}>
                    {a.isUnlocked ? a.icon : '🔒'}
                  </Text>
                </View>
                <Text style={[styles.achievementName, !a.isUnlocked && styles.textMuted]}>
                  {a.name}
                </Text>
                <Text style={[styles.achievementDesc, !a.isUnlocked && styles.textMuted]}>
                  {a.description}
                </Text>
                {a.isUnlocked && (
                  <Text style={styles.unlockedLabel}>✓ Unlocked</Text>
                )}
              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fafafa' },
  container: { padding: 20, gap: 20, paddingBottom: 40 },

  header: { paddingTop: 10, paddingBottom: 4 },
  subtitle: { fontSize: 14, color: '#666' },
  title: { fontSize: 24, fontWeight: '600', marginTop: 4 },

  // Goal card
  goalCard: {
    backgroundColor: '#f0fdf4', borderColor: '#bbf7d0',
    borderWidth: 1, padding: 24, borderRadius: 24,
  },
  goalCardTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 20,
  },
  goalBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#dcfce7', paddingHorizontal: 10,
    paddingVertical: 4, borderRadius: 20, gap: 4, alignSelf: 'flex-start',
  },
  goalBadgeText: { color: '#16a34a', fontSize: 12, fontWeight: 'bold' },
  goalSubtitle: { fontSize: 14, color: '#4b7a5e', marginTop: 10 },
  iconCircleLarge: {
    width: 52, height: 52, backgroundColor: '#dcfce7',
    borderRadius: 16, alignItems: 'center', justifyContent: 'center',
  },
  daySelector: { flexDirection: 'row', gap: 7 },
  dayBtn: {
    flex: 1, height: 42, borderRadius: 12,
    backgroundColor: '#fff', borderWidth: 1,
    borderColor: '#bbf7d0', alignItems: 'center', justifyContent: 'center',
  },
  dayBtnActive: { backgroundColor: '#000', borderColor: '#000' },
  dayBtnText: { fontSize: 14, fontWeight: '700', color: '#16a34a' },
  dayBtnTextActive: { color: '#fff' },
  goalHint: { marginTop: 14, fontSize: 13, color: '#4b7a5e', fontStyle: 'italic' },

  // Section header
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 18, fontWeight: '600' },
  sectionCounter: { fontSize: 13, color: '#888', fontWeight: '500' },

  // Achievement grid
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  achievementCard: {
    width: '47%', backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#eee',
    padding: 16, borderRadius: 18,
  },
  achievementCardLocked: { backgroundColor: '#f5f5f5', borderColor: '#e5e5e5' },
  iconCircle: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: '#fef9c3', alignItems: 'center',
    justifyContent: 'center', marginBottom: 10,
  },
  iconCircleLocked: { backgroundColor: '#e5e5e5' },
  iconEmoji: { fontSize: 22 },
  achievementName: { fontSize: 13, fontWeight: '700', marginBottom: 3 },
  achievementDesc: { fontSize: 11, color: '#555', lineHeight: 16 },
  textMuted: { color: '#bbb' },
  unlockedLabel: { marginTop: 8, fontSize: 11, color: '#16a34a', fontWeight: '700' },
});
