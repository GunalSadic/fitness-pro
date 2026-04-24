import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { CheckCircle2, XCircle, QrCode, User as UserIcon, ChevronRight } from 'lucide-react-native';

export default function HomeScreen({ navigation }: any) {
  // Mocking the auth context from your web app
  const active = true;
  const days = 14;
  const endDate = "Oct 15, 2024";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Welcome back</Text>
          <Text style={styles.title}>Hi, Gunal 👋</Text>
        </View>

        {/* Membership Status Card */}
        <View style={[styles.card, active ? styles.cardActive : styles.cardExpired]}>
          <View style={[styles.badge, active ? styles.badgeActive : styles.badgeExpired]}>
            {active ? <CheckCircle2 size={14} color="#16a34a" /> : <XCircle size={14} color="#dc2626" />}
            <Text style={[styles.badgeText, active ? { color: '#16a34a' } : { color: '#dc2626' }]}>
              {active ? "Active" : "Expired"}
            </Text>
          </View>
          
          <Text style={styles.cardSubtitle}>
            {active ? "Membership active" : "Membership expired on"}
          </Text>
          <Text style={styles.cardTitle}>{endDate}</Text>
          
          {active ? (
            <Text style={styles.cardSubtitle}>{days} days remaining</Text>
          ) : (
            <TouchableOpacity style={styles.renewBtn}>
              <Text style={styles.renewBtnText}>Renew membership</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Primary CTA */}
        <TouchableOpacity 
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('QR')}
        >
          <QrCode color="#fff" size={20} />
          <Text style={styles.primaryBtnText}>Show My QR Code</Text>
        </TouchableOpacity>

       
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
  card: { padding: 24, borderRadius: 24, borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  cardActive: { borderColor: '#bbf7d0', backgroundColor: '#f0fdf4' },
  cardExpired: { borderColor: '#fecaca', backgroundColor: '#fef2f2' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start', gap: 4 },
  badgeActive: { backgroundColor: '#dcfce7' },
  badgeExpired: { backgroundColor: '#fee2e2' },
  badgeText: { fontSize: 12, fontWeight: '600' },
  cardSubtitle: { marginTop: 16, fontSize: 14, color: '#666' },
  cardTitle: { marginTop: 4, fontSize: 28, fontWeight: 'bold' },
  renewBtn: { marginTop: 16, borderWidth: 1, borderColor: '#fca5a5', padding: 8, borderRadius: 8, alignItems: 'center' },
  renewBtnText: { color: '#dc2626', fontWeight: '500' },
  primaryBtn: { backgroundColor: '#000', flexDirection: 'row', height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 8 },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  secondaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#eee' },
  secondaryBtnLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconContainer: { width: 40, height: 40, backgroundColor: '#f4f4f5', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  secondaryBtnTitle: { fontSize: 14, fontWeight: '500' },
  secondaryBtnSubtitle: { fontSize: 12, color: '#888' }
});