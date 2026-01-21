
import React from 'react';

export interface User {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  isEmployee: boolean;
  isNew: boolean;
  gender: 'male' | 'female';
  birthday: string;
  level: number;
  growth: number;
  points: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
  waterServiceInfo?: string;
}

export interface Coupon {
  id: string;
  title: string;
  desc: string;
  value: number;
  threshold: number;
  expiry: string;
  type: 'cash' | 'service' | 'employee';
  linkedProductId?: string;
}

export interface TransactionRecord {
  id: string;
  title: string;
  amount: string;
  time: string;
  type: 'points' | 'coupon';
}

export interface ProductSpec {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[]; // 轮播图
  tags: string[];
  isNew?: boolean;
  isEmployeeOnly?: boolean;
  isWelfare?: boolean; // 福利商品标识
  stock: number; // 库存数量
  sales: number; // 销量
  couponCompatible?: boolean;
  couponType?: 'cash' | 'service' | 'employee'; // 适配的券类型
  usageRules?: string[]; // 使用规则
  specs?: ProductSpec[]; // 规格选择
  deliveryRange?: string; // 配送范围
  desc?: string;
  detailImages?: string[]; // 详情页图片
}

export interface NewsItem {
  id: string;
  type: 'news' | 'notice' | 'activity';
  title: string;
  summary: string;
  date: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: string;
  isEmployeeOnly: boolean;
  isWelfare?: boolean;
  children?: Category[]; // 支持多级分类
}

export interface ServiceType {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}
