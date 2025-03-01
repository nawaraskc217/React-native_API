import React, { useEffect, useState } from 'react';
import { 
  ActivityIndicator, FlatList, Text, View, 
  StyleSheet, SafeAreaView, StatusBar, TextInput, Button 
} from 'react-native';

const Networking = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState('');

  // Fetch Data from API
  const fetchData = async (limit = 10) => {
    try {
      setLoading(true);
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
      const data = await response.json();
      setData(data);
      setError('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Refresh Handler
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchData(15);
    } finally {
      setRefreshing(false);
    }
  };

  // Add a New Post
  const addPost = async () => {
    setIsPosting(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          title: postTitle,
          body: postBody
        })
      });

      const newPost = await response.json();
      setData([newPost, ...data]); // Update UI immediately
      setPostTitle('');
      setPostBody('');
      setError('');
    } catch (error) {
      console.error('Error adding new post:', error);
      setError('Failed to add new post');
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Loading State UI
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading.....</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="Post title" 
              placeholderTextColor="#888"
              value={postTitle} 
              onChangeText={setPostTitle} 
            />
            <TextInput 
              style={styles.input} 
              placeholder="Post body" 
              placeholderTextColor="#888"
              value={postBody} 
              onChangeText={setPostBody} 
            />
            <Button title={isPosting ? 'Adding....' : 'Add Post'} onPress={addPost} disabled={isPosting} />
          </View>

          {/* Post List */}
          <FlatList
            data={data}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
              </View>
            )}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  loadingText: {
    color: '#000',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  errorContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: 'plum',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'purple',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'green',
    borderWidth: 2,
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  body: {
    fontSize: 14,
    color: '#666',
  },
});

export default Networking;
