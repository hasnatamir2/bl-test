import React, {useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DataTable, TextInput} from 'react-native-paper';

export interface Product {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface Customer {
  id: string;
  name: string;
  discount: number;
}

interface InvoiceProps {
  products: Product[];
  onEdit: (id: string) => void;
}

interface TransactionProps {
  customer: Customer;
  products: Product[];
  addInvoice: (data: any) => void;
  newInvoice: {
    name: string;
    qty: number;
    price: number;
  };
  setNewInvoice: (data: any) => void;
  editId: string;
  onEdit: (id: string) => void;
  onClear: () => void;
  error: string;
}

const Invoice = (props: InvoiceProps) => {
  const {products, onEdit} = props;
  return (
    <DataTable>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Quantity</DataTable.Title>
        <DataTable.Title>Price</DataTable.Title>
        <DataTable.Title>Edit</DataTable.Title>
      </DataTable.Header>
      {products.map(product => (
        <DataTable.Row key={product.id}>
          <DataTable.Cell>{product.name}</DataTable.Cell>
          <DataTable.Cell>{product.qty}</DataTable.Cell>
          <DataTable.Cell>{product.price}</DataTable.Cell>
          <DataTable.Cell>
            <TouchableOpacity onPress={() => onEdit(product.id)}>
              <Text style={styles.btn}>Edit</Text>
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

const Transaction = (props: TransactionProps) => {
  const {
    customer,
    products,
    addInvoice,
    newInvoice,
    setNewInvoice,
    editId,
    onEdit,
    onClear,
    error,
  } = props;

  const total = useCallback(() => {
    // TODO: calculate total
    return products.reduce((acc, product) => {
      return acc + product.price * product.qty;
    }, 0);
  }, [products]);

  const netTotal = useCallback(() => {
    // TODO: calculate total after discount
    return total() - (total() * customer?.discount) / 100;
  }, [customer, total]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Transaction</Text>
      <View style={styles.invoiceHeading}>
        <Text style={styles.subHeading}>Invoice</Text>
      </View>
      <View style={styles.customerContainer}>
        <Text style={styles.customer}>{customer?.name || 'customer'}</Text>
        <Text style={styles.customer}>
          Discount: {customer?.discount || '0'}%
        </Text>
      </View>
      <View style={styles.addInvoice}>
        <TextInput
          style={styles.inputText}
          placeholder={'Name'}
          value={newInvoice.name}
          onChange={e => {
            setNewInvoice((prev: any) => ({
              ...prev,
              name: e.nativeEvent.text,
            }));
          }}
        />
        <TextInput
          style={styles.inputText}
          placeholder={'Qty'}
          value={String(newInvoice.qty)}
          onChange={e => {
            setNewInvoice((prev: any) => ({
              ...prev,
              qty: e.nativeEvent.text,
            }));
          }}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputText}
          placeholder={'Price'}
          value={String(newInvoice.price)}
          onChange={e => {
            setNewInvoice((prev: any) => ({
              ...prev,
              price: e.nativeEvent.text,
            }));
          }}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity onPress={addInvoice}>
        <Text style={styles.btn}>{editId ? 'Edit' : 'Add'} Invoice</Text>
      </TouchableOpacity>
      {editId && (
        <TouchableOpacity onPress={onClear}>
          <Text style={styles.btn}>Clear</Text>
        </TouchableOpacity>
      )}
      <Invoice products={products} onEdit={onEdit} />
      <Text style={styles.total}>Total: {total()}</Text>
      <Text style={styles.textRight}>Discount: {customer?.discount}%</Text>
      <Text style={styles.netTotal}>{netTotal()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: 24,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  invoiceHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  customerContainer: {},
  addInvoice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customer: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: 'lightgray',
    padding: 5,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  inputText: {
    height: 36,
    width: 120,
    color: '#000000',
  },
  errorText: {
    color: 'red',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  textRight: {
    textAlign: 'right',
  },
  netTotal: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default Transaction;
