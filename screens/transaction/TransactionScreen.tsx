import React, {useEffect, useState} from 'react';
import Transaction from '../../components/transaction';
import {View, StyleSheet} from 'react-native';
import {
  query,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
} from 'firebase/firestore';
import {db} from '../../services/FBService';
import {Customer, Product} from '../../components/transaction';

const TransactionScreen = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [newInvoice, setNewInvoice] = useState<any>({
    name: '',
    qty: 0,
    price: 0,
  });
  const [editId, setEditId] = useState<string>('');
  const [error, setError] = useState<string>('');

  const getProducts = async () => {
    const prod = query(collection(db, 'product'));
    const productData = await getDocs(prod);
    setProducts([]);
    if (!productData.empty) {
      productData.forEach(doc => {
        const product = doc.data();
        setProducts(prev => [
          ...prev,
          {
            id: doc.id,
            name: product.name,
            price: product.price,
            qty: product.qty,
          },
        ]);
      });
    }
  };

  const getData = async () => {
    const cus = query(collection(db, 'customer'));
    const customerData = await getDocs(cus);

    if (!customerData.empty) {
      customerData.forEach(doc => {
        const customer = doc.data();
        setCustomers(prev => [
          ...prev,
          {
            id: doc.id,
            name: customer?.name,
            discount: customer?.discount || 0,
          },
        ]);
      });
    }
  };

  const addInvoice = async () => {
    if (!newInvoice.name || !newInvoice.qty || !newInvoice.price) {
      setError('Please fill all fields');
      return;
    }
    setError('');
    if (editId) {
      const ref = doc(db, 'product', editId);
      await setDoc(
        ref,
        {
          name: newInvoice.name,
          qty: Number(newInvoice.qty),
          price: Number(newInvoice.price),
        },
        {merge: true},
      );
      await getProducts();
      return;
    }
    const ref = collection(db, 'product');
    await addDoc(ref, {
      name: newInvoice.name,
      qty: Number(newInvoice.qty),
      price: Number(newInvoice.price),
    });
    await getProducts();
  };

  const onEdit = (id: string) => {
    setEditId(id);
    const product = products.find(pr => pr.id === id);
    if (product) {
      setNewInvoice({
        name: product.name,
        qty: product.qty,
        price: product.price,
      });
    }
  };

  const onClear = () => {
    setNewInvoice({
      name: '',
      qty: 0,
      price: 0,
    });
    setEditId('');
  };

  useEffect(() => {
    getData();
    getProducts();
    return () => {
      setProducts([]);
      setCustomers([]);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Transaction
        customer={customers[0]}
        products={products}
        addInvoice={addInvoice}
        newInvoice={newInvoice}
        setNewInvoice={setNewInvoice}
        editId={editId}
        onEdit={onEdit}
        onClear={onClear}
        error={error}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});

export default TransactionScreen;
