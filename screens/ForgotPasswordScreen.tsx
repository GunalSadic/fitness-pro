import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { CheckCircle2, ArrowLeft } from 'lucide-react-native';

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReset = () => {
    if (email) setIsSubmitted(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft color="#000" size={24} />
        </TouchableOpacity>

        {!isSubmitted ? (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Reset password</Text>
              <Text style={styles.subtitle}>Enter your email and we'll send you a link to reset your password.</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="alex@example.com" 
                  value={email} 
                  onChangeText={setEmail} 
                  autoCapitalize="none" 
                  keyboardType="email-address" 
                />
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleReset}>
                <Text style={styles.primaryBtnText}>Send reset link</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.successContainer}>
            <View style={styles.iconBig}>
              <CheckCircle2 color="#16a34a" size={48} />
            </View>
            <Text style={styles.title}>Check your email</Text>
            <Text style={styles.subtitleCentered}>
              We sent a password reset link to <Text style={styles.boldText}>{email}</Text>
            </Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.primaryBtnText}>Back to login</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fafafa' },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  backBtn: { position: 'absolute', top: 20, left: 24, zIndex: 10, width: 40, height: 40, justifyContent: 'center' },
  header: { marginBottom: 40, marginTop: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#000' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 8 },
  subtitleCentered: { fontSize: 16, color: '#666', marginTop: 8, textAlign: 'center', marginBottom: 30 },
  boldText: { fontWeight: 'bold', color: '#000' },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: '500', color: '#333' },
  input: { height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 12, paddingHorizontal: 16, backgroundColor: '#fff', fontSize: 16 },
  primaryBtn: { backgroundColor: '#000', height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: 10, width: '100%' },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  successContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  iconBig: { width: 80, height: 80, backgroundColor: '#dcfce7', borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }
});