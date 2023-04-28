# Java 学习笔记

## **Java 泛型**

> 1. 泛型是`JDK1.5`后增加的，它帮助我们建立`类型安全`的`集合`
> 2. 泛型的`本质`是`数据类型参数化`，处理的数据类型是不固定的，而是可以`作为参数`传入。通常把泛型理解为数据类型的一个占位符（类似：`形式参数`），即告诉编译器，在调用泛型时必须传入实际类型。
> 3. 这种参数类型可以用在`类`、`接口`和`方法`中，分别被称为`泛型类`、`泛型接口`、`泛型方法`。
> 4. Java采用`泛型擦除机制`来引入泛型，Java中的泛型`仅仅是给编译器javac`使用的，确保数据的安全性和免去强制类型转换问题，但是，`一旦编译完成，所有和泛型有关的类型全部擦除`。

| 泛型标记 | 对应单词 | 说明                           |
| -------- | -------- | ------------------------------ |
| `E`      | Element  | 在容器中使用，表示容器中的元素 |
| `T`      | Type     | 表示普通的Java类               |
| `K`      | Key      | 表示键，例如：Map中的键key     |
| `V`      | Value    | 表示值                         |
| `N`      | Number   | 表示数值类型                   |
| `？`     |          | 表示不确定的Java类型           |



### 泛型类

> 泛型类，指的是把泛型定义在类上，用户使用该类的时候，才把类型明确下来。泛型类的具体使用方法是在类的名称后添加一个或多个类型参数声明，如：`<T>` 、`<T,K,V>`

```java
public class 类名<泛型表示符号>{
    
}
```

```java
package ginyi.com;

// 泛型类
public class Test01<T>{
    private T flag;

    public T getFlag() {
        return flag;
    }

    public void setFlag(T flag) {
        this.flag = flag;
    }

    public static void main(String[] args) {
        // 创建对象时，指定泛型类型：String
        Test01<String> test01 = new Test01<>();
        test01.setFlag("hello world");
        System.out.println(test01.getFlag());

        // 创建对象时，指定泛型类型：Integer
        Test01<Integer> test02 = new Test01<>();
        test02.setFlag(123);
        System.out.println(test02.getFlag());
    }
}
```

```
hello world
123
```



### 泛型接口

> 泛型接口和泛型类的声明方式一致。泛型接口的具体类型需要在实现类中进行声明。

```java
public interface 接口名<泛型表示符号>{
    
}
```

```java
package ginyi.com;

// 实现泛型接口，指定类型
public class Test02 implements MyInterface<Integer>{

    @Override
    public Integer getValue(Integer value) {
        return value;
    }

    public static void main(String[] args) {
        Test02 test02 = new Test02();
        System.out.println(test02.getValue(123));
    }
}

// 声明泛型接口
interface MyInterface<T>{
    T getValue(T value);
}
```

```
123
```



### 泛型方法 - 非静态

> 泛型类中所定义的泛型，在方法中也可以使用。泛型方法是指将方法的参数类型定义成泛型，以便在调用时接收不同类型的参数，编译器自行推测参数类型。

```java
public <泛型表示符号> void 方法名(泛型表示符号 value){
    
}

public <泛型表示符号> 泛型表示符号 方法名(泛型表示符号 value){
    
}
```

```java
package ginyi.com;

// 泛型 - 非静态方法
public class Test03 {
    // 无返回值
    public <T> void setValue(T value){
        System.out.println(value);
    }

    // 有返回值
    public <T> T getValue(T value){
        return value;
    }

    public static void main(String[] args) {
        
        Test03 test03 = new Test03();
        
        test03.setValue("Hello world");     // 字符串
        test03.setValue(123);               // 整形

        System.out.println(test03.getValue("Hello world"));
        System.out.println(test03.getValue(123));
    }
}

```

```
Hello world
123
Hello world
123
```



### 泛型方法 - 静态

> 静态方法中使用泛型时有一种情况需要注意一下，那就是静态方法无法访问类上定义的泛型；如果静态方法操作的引用数据类型不确定的时候，必须把泛型定义在方法上。

```java
public static <泛型表示符号> void setValue(泛型表示符号 value){
    
}

public static <泛型表示符号> 泛型表示符号 getValue(泛型表示符号 value){
    return value
}
```

**注意：**静态方法无法访问类上定义的泛型

```java
package ginyi.com;

// 静态方法无法使用类定义的泛型
public class Test04<T> {

    // 程序会报错
    public static T getVlue(T value){
        return value;
    }
}
```

```java
package ginyi.com;

// 静态方法定义的泛型
public class Test04 {

    public static <T> void setValue(T value){
        System.out.println(value);
    }

    public static <T> T getValue(T value){
        return value;
    }

    public static void main(String[] args) {
        setValue("Hello world");
        System.out.println(getValue(123456));
    }
}
```

```
Hello world
123456
```



### 泛型方法与可变参数

> 在泛型方法中，泛型也可以定义可变参数类型

```java
public <泛型表示符号> void setValue(泛型表符号...args){
    
}
```

```java
package ginyi.com;

public class Test05 {

    // 泛型方法与可变参数
    public <T> void setValue(T...args){
        for (T arg : args) {
            System.out.println(arg);
        }
    }

    public static void main(String[] args) {
        Test05 test05 = new Test05();
        Integer[] ints = new Integer[]{1, 2, 3};
        String[] chars = new String[]{"a", "b", "c"};

        test05.setValue(ints);
        test05.setValue(chars);
    }
}
```

### 泛型无界通配符

> `?`表示`类型通配符`，用于代替具体的类型。它只能在`<>`中使用。可用于`解决具体类型不确定`的问题。

```java
public void setValue(类<?> value){
    
}
```

```java
package ginyi.com;

public class Test06 {

    // 接收不确定类型的泛型类型对象
    public static void showFlag(MyGeneric<?> MyGeneric) {
        System.out.println(MyGeneric.getFlag());
    }

    public static void main(String[] args) {
        MyGeneric<String> myGeberic1 = new MyGeneric<>();
        myGeberic1.setFlag("hello world");
        showFlag(myGeberic1);

        MyGeneric<Integer> myGeberic2 = new MyGeneric<>();
        myGeberic2.setFlag(123456);
        showFlag(myGeberic2);
    }

}

class MyGeneric<T>{
    private T flag;

    public void setFlag(T flag) {
        this.flag = flag;
    }

    public T getFlag() {
        return flag;
    }
}
```

```
hello world
123456
```



### 泛型通配符的上下限限定

> `上限`通配符表示通配符的类型是`T类以及T类的子类`或者`T接口以及T接口的子接口`
>
> `下限`通配符表示通配符的类型是`T类以及T类的父类`或者`T接口以及T接口的父接口`，**注意：**下限限定不适用于`泛型类`

**注意：·**`Number类`的`子类`有`Integer`

```java
// 上限
public void setValue(类<? extends Number>){
    
}

// 下限
public void setValue(类<? super Number>){
    
}
```

```java
package ginyi.com;

public class Test07 {

    // 接收不确定类型的泛型类型对象（限制范围：只能是Number类或其子类）
    public static void showFlag(MyGeneric2<? extends Number> myGeneric2) {
        System.out.println(myGeneric2.getFlag());
    }

    public static void main(String[] args) {
        MyGeneric2<Number> myGeneric2 = new MyGeneric2<>();
        myGeneric2.setFlag(123456);
        showFlag(myGeneric2);

        MyGeneric2<Integer> myGeneric3 = new MyGeneric2<>();
        myGeneric3.setFlag(123456789);
        showFlag(myGeneric3);
    }

}

class MyGeneric2<T>{
    private T flag;

    public void setFlag(T flag) {
        this.flag = flag;
    }

    public T getFlag() {
        return flag;
    }
}
```



## **Java 序列化**

> ### 为什么需要序列化和反序列化?
>
>   之所以需要序列化和反序列化，`主要是因为Java对象是在JVM中生成的`，是内存中的数据，如果需要把对象的字节序列远程传输或保存到硬盘上时，你就需要将Java对象转换成二进制流。 这个转换过程就是序列化。

>​     `序列化`就是一种用来处理对象流的机制，所谓对象流也就是将对象的内容进行流化。可以对流化后的对象进行读写操作，也可将流化后的对象传输于网络之间。
>
>| 操作       | 说明                           |
>| ---------- | ------------------------------ |
>| `序列化`   | 把Java对象转换为字节序列的过程 |
>| `反序列化` | 把字节序列恢复为Java对象的过程 |

> Java序列化的`两大用处`：
>
> 1. 把对象的字节序列永久地保存到硬盘上，通常存放在一个文件中；
> 2. 在网络上传送对象的字节序列（前后端交互）；

> 将`对象`包装成`JSON字符串（字符流）`
> 转`Json工具`有`Jackson`、`FastJson`或者`GJson`，它们各有优缺点：
>
> | 工具名称   | 作用说明                                                     |
> | ---------- | ------------------------------------------------------------ |
> | `JackSon`  | Map、List的转换可能会出现问题。转复杂类型的Bean时，`转换的Json格式不是标准的Json格式`。`适合处理大文本Json` |
> | `FastJosn` | `速度最快`。将复杂类型的Bean转换成Json可能会有问题：引用类型如果没有引用被出错。适合对性能有要求的场景 |
> | `GJson`    | `功能最全`。可以将复杂的Bean和Json字符串进行互转。`性能上面比FastJson有所差距`。`适合处理小文本Json`，和对于数据正确性有要求的场景 |

```java
package ginyi.com;

import java.io.*;

public class Test08 {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        Person person = new Person("张三", 28);
        File file = new File("person.txt");

        // 序列化对象，输出到person.txt
        ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(file));
        out.writeObject(person);
        out.close();

        // 反序列对象，打印对象
        ObjectInputStream in = new ObjectInputStream(new FileInputStream(file));
        Object newPerson = in.readObject();
        in.close();
        System.out.println(newPerson);
    }

}

// 要被序列化的对象，实现Serializable接口
class Person implements Serializable{
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

```







## **Java 多线程**

> `多线程说明`
>
> ​       Java 给多线程编程提供了内置的支持。 一条线程指的是进程中一个单一顺序的控制流，一个进程中可以并发多个线程，每条线程并行执行不同的任务。



### 线程的创建

#### Thread

继承`Thread`类，重写`run()`方法，子类使用调用`start()`，开启多线程

注意：这种方式不能

```java
package ginyi.com;

public class Test01 extends Thread {
    /**
     * 实现run方法
     */
    @Override
    public void run() {
        for (int i = 0; i < 20; i++) {
            System.out.println("我是子线程的" + i);
        }
    }

    public static void main(String[] args) {
        /**
         * 创建线程对象
         */
        Test01 test01 = new Test01();
        /**
         * 调用start方法，启用线程
         */
        test01.start();

        for (int i = 0; i < 500; i++) {
            System.out.println("我是main主线程中的" + i);
        }
    }
}

```

输出结果，可知`main线程`和`子线程`并发进行

```
...
我是main主线程中的32
我是main主线程中的33
我是子线程的0
我是子线程的1
我是main主线程中的34
...
```



#### Runnable

> 推荐使用`Runnable`来实现多线程，因为Java是单继承的。

实现`Runnable`接口，重写`run()`方法，创建线程对象后，将对象交给`Thread()`代理，最后让其调用`start()`开启多线程

```java
package ginyi.com;

public class Test02 implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 20; i++) {
            System.out.println("我是子线程" + i);
        }
    }

    public static void main(String[] args) {
        Test02 test02 = new Test02();
        // 让Thread()来代理
        new Thread(test02).start();  

        for (int i = 0; i < 30; i++) {
            System.out.println("我是main线程的");
        }
    }
}
```

```
...
我是main主线程中的32
我是main主线程中的33
我是子线程0
我是子线程1
我是main主线程中的34
...
```



### 多线程并发

> 创建同一个对象，由不同线程进行代理，操作同一资源

**注意：**多个线程操作同一个资源的情况下，线程不安全，数据回紊乱

```java
package ginyi.com;

public class Test03 implements Runnable{
    // 票数
    private int ticketNums = 10;

    @Override
    public void run() {
        while (true) {
            if(this.ticketNums <= 0) break;
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + " --- 拿到了第" + this.ticketNums-- + "票");
        }
    }

    public static void main(String[] args) {
        Test03 test03 = new Test03();

        // 由不同线程进行代理同一对象，操作同一资源
        new Thread(test03, "小明").start();
        new Thread(test03, "小红").start();
        new Thread(test03, "小李子").start();
    }
}

```

```
小红 --- 拿到了第9票
小明 --- 拿到了第8票
小李 --- 拿到了第10票
小明 --- 拿到了第6票
小红 --- 拿到了第7票
小李 --- 拿到了第5票
小红 --- 拿到了第3票
小明 --- 拿到了第2票
小李 --- 拿到了第4票
小李 --- 拿到了第1票
小明 --- 拿到了第-1票
小红 --- 拿到了第0票
```

### 静态代理

> 代理就是帮人做事情。比如结婚请婚庆公司帮忙筹备婚礼现场，而被代理的对象只需关注它最核心的功能——结婚

真实对象和代理对象都要实现同一个接口

```java
package ginyi.com;

interface Marry {
    void HappyMarry();
}

/**
 * 真实对象
 */
class You implements Marry{
    @Override
    public void HappyMarry() {
        System.out.println("--- 真实对象的核心事件执行了 ---");
    }
}

/**
 * 代理角色
 */
class WeddingCompany implements Marry{
    // 要代理的对象
    private Marry target;

    public WeddingCompany(Marry target) {
        this.target = target;
    }

    @Override
    public void HappyMarry() {
        // 真实对象
        this.target.HappyMarry();
    }
}

public class StaticProxy {
    public static void main(String[] args) {
        /**
         * 代理目标对象
         */
         new WeddingCompany(new You()).HappyMarry();
        /**
         *线程 - 代理
         */
        new Thread(() -> System.out.println("要代理的对象放这儿，如同上面的 new You();")).start();
    }
}
```

```
--- 真实对象的核心事件执行了 ---
要代理的对象放这儿，如同上面的 new You();
```





### 线程状态

<img src="https://gitee.com/my-images/typora-imgs/raw/master/java-thread.jpg" alt="java-thread" style="zoom:80%;" />



#### 线程停止

> 1. 建议线程正常停止 ----> 利用次数，不建议死循环
> 2. 建议使用标志位 ----> 设置一个标志位（让线程自己停下来，推荐这种方法）
> 3. 不要使用`stop`或者`destroy`等过时或者`JDK不建议`的方法

```java
package ginyi.com;

public class Stop implements Runnable {

    // 标志位
    private boolean flag = true;

    @Override
    public void run() {
        int i = 0;
        while (flag) {
            System.out.println("run...Thraed" + i++);
        }
    }

    // 设置一个公开的方法停止线程，转换标志位
    public void stop() {
        this.flag = false;
    }

    public static void main(String[] args) {
        Stop TestStop = new Stop();
        new Thread(TestStop).start();
        for (int i = 0; i < 1000; i++) {
            System.out.println("主线程还在运行" + i);
            if (i == 900) {
                TestStop.stop();
                System.out.println("子线程 --------> 停止");
            }
        }
    }
}
```

```
...
主线程还在运行899
主线程还在运行900
run...Thraed591
子线程 --------> 停止
主线程还在运行901
...
```



#### 线程休眠

>1. sleep指的是当前线程阻塞的毫秒数
>2. sleep存在异常`InterruptedException`
>3. sleep时间达到后线程进入就绪状态
>4. sleep可以模拟网络延时，倒计时等
>5. **重点：**每一个对象都有一把锁，sleep不会释放锁

```java
package ginyi.com;

import java.text.SimpleDateFormat;
import java.util.Date;

// 打印系统当前时间
public class SystemCurrentTime {

    public static void main(String[] args) throws InterruptedException {
        // 获取系统当前时间
        Date startTime = new Date(System.currentTimeMillis());
        while(true) {
            // 让main线程睡眠1秒
            Thread.sleep(1000);
            System.out.println(new SimpleDateFormat("HH:mm:ss").format(startTime));
            startTime = new Date(System.currentTimeMillis());
        }
    }
}
```

```
22:05:02
22:05:03
22:05:04
...
```

#### 线程礼让

> 1. 礼让线程，让当前正在执行的线程暂停，但不阻塞
> 2. 将线程从运行状态转为就绪状态
> 3. 让`cpu重新调度`，礼让不一定成功，看`cpu心情`

```java
package ginyi.com;

public class TestYield {
    public static void main(String[] args) {
        MyYield myYield = new MyYield();
        new Thread(myYield, "线程A").start();
        new Thread(myYield, "线程B").start();
    }
}

class MyYield implements Runnable{
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + "线程开始执行");
        Thread.yield(); // 线程开始礼让
        System.out.println(Thread.currentThread().getName() + "线程停止执行");

    }
}

```

```
线程A线程开始执行
线程B线程开始执行
线程B线程停止执行
线程A线程停止执行
```

#### 线程合并

> 1. Join合并线程，待此线程执行完成后，再执行其他线程，其他线程阻塞
> 2. 线程合并就是线程插队的意思

```java
package ginyi.com;

public class TestJoin implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("==== 线程vip来了，插队 ====" + i);
        }
    }

    public static void main(String[] args) throws InterruptedException {

        // 开启线程
        TestJoin testJoin = new TestJoin();
        Thread thread = new Thread(testJoin);
        thread.start();

        // 主线程
        for (int i = 0; i < 5; i++) {
            if (i==4) {
                thread.join();  // 线程插队
            }
            System.out.println("main + " + i);
        }
    }
}

```

```
main + 0
main + 1
main + 2
main + 3
==== 线程vip来了，插队 ==== 0
==== 线程vip来了，插队 ==== 1
==== 线程vip来了，插队 ==== 2
==== 线程vip来了，插队 ==== 3
==== 线程vip来了，插队 ==== 4
main + 4
```

#### 线程状态

> `新生` --> `就绪` --> `运行` --> `（阻塞`） --> `死亡`
>
> 其中，阻塞可有可无，当发生阻塞时，若要再次运行，需`cpu调度`，回到`就绪状态`

**注意：**线程终止后，不能再次启动（即不能再次`start()`）

```java
package ginyi.com;

public class State {

    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            for (int i = 0; i < 3; i++) {
                try {
                    // 线程阻塞，处于TIMED_WAITING等待状态
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println("----- Thread 执行完毕 -----");
        });

        // 当前线程尚未启动，处于NEW新生状态
        Thread.State state = thread.getState();
        System.out.println("当前线程的状态 ---> " + state);

        // 启动线程，处于RUN运行状态
        thread.start();

        // 线程不终止，一直运行
        while (state != Thread.State.TERMINATED){
            Thread.sleep(100);
            state = thread.getState();
            System.out.println("当前线程的状态 ---> " + state);
        }

    }
}

```



### 线程优先级

> 1. Java提供一个线程调度器来监控程序中启动后进入就绪状态的所有线程，线程调度器按照优先级决定应该调用哪个线程来执行
> 2. 线程的优先级用数字来表示，范围从1~10
>    1. `Thread.MIN_PRIORITY` = 1
>    2. `Thread.MAX_PRIORITY` = 10
>    3. `Thread.NORM_PRIORITY` = 5
> 3. 使用以下方式改变或获取优先级
>    1. `getPriority()`
>    2. `setPriority(int xxx)`

**注意：**先设置优先级，再启动`start()`



```java
package ginyi.com;

public class Priority {
    public static void main(String[] args) {
        System.out.println(Thread.currentThread().getName() + " ----> " + Thread.currentThread().getPriority());

        MyPriority myPriority1 = new MyPriority();
        MyPriority myPriority2 = new MyPriority();
        MyPriority myPriority3 = new MyPriority();
        MyPriority myPriority4 = new MyPriority();

        Thread thread1 = new Thread(myPriority1);
        Thread thread2 = new Thread(myPriority2);
        Thread thread3 = new Thread(myPriority3);
        Thread thread4 = new Thread(myPriority4);

        thread1.setPriority(Thread.MAX_PRIORITY);
        thread1.start();

        thread2.setPriority(Thread.MIN_PRIORITY);
        thread2.start();

        thread3.setPriority(3);
        thread3.start();

        thread4.setPriority(8);
        thread4.start();
    }
}

class MyPriority implements Runnable{
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + " ----> " + Thread.currentThread().getPriority());
    }
}

```

```
main ----> 5
Thread-0 ----> 10
Thread-3 ----> 8
Thread-2 ----> 3
Thread-1 ----> 1
```



### 守护线程

> 1. 线程分为`用户线程`和`守护线程`
> 2. `虚拟机必须确保用户线程执行完毕`
> 3. `虚拟机不用等待守护线程执行完毕`
> 4. 如：后台记录操作日志，监控内存，垃圾回收等待...

```java
package ginyi.com;

public class Daemon {
    public static void main(String[] args) {
        Thread DaemonThread = new Thread(new DaemonThread());
        DaemonThread.setDaemon(true);
        DaemonThread.start();

        Thread UserDaemon = new Thread(new UserDaemon());
        UserDaemon.start();

    }

}

/**
 * 守护线程
 */
class DaemonThread implements Runnable{
    @Override
    public void run() {
        while (true) {
            System.out.println("守护线程一直会执行着...");
        }
    }
}

/**
 * 用户线程
 */
class UserDaemon implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 3; i++) {
            System.out.println("UserDaemon 用户线程一直执行着 " + i);
        }
        System.out.println("-- 用户线程结束 --");
    }
}
```

```
守护线程一直执行着...
守护线程一直执行着...
UserDaemon 用户线程一直执行着 0
UserDaemon 用户线程一直执行着 1
UserDaemon 用户线程一直执行着 2
-- 用户线程结束 --
守护线程一直执行着...
守护线程一直执行着...
```



### 线程同步机制

> 多个线程操作同一资源，排队等待，上一线程操作完毕才轮到下一线程执行。
>
> 同步机制形成的条件：队列 + 锁

`队列：`排队等候

`同步锁(synchronized)：`当前线程执行时，上锁，避免下一进程篡进。



#### 锁方法

> `方法加锁`锁的对象是当前类的class

> 模拟抢票，具体观察`buy()`方法

```java
package ginyi.com;

public class Ticket{
    public static void main(String[] args) {
        BuyTicket buyTicket = new BuyTicket();

        new Thread(buyTicket, "小明").start();
        new Thread(buyTicket, "小红").start();
        new Thread(buyTicket, "小绿").start();
    }
}

class BuyTicket implements Runnable{
    private int ticketNum = 10;
    private boolean flag = true;

    @Override
    public void run() {
        while (flag){
            try {
                buy();
                Thread.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private synchronized void buy() {
        if (ticketNum <= 0) {
            flag = false;
            return;
        }
        System.out.println(Thread.currentThread().getName() + " 抢到票 " + ticketNum--);
    }
}
```

```
小明 抢到票 10
小红 抢到票 9
小绿 抢到票 8
小绿 抢到票 7
小红 抢到票 6
小明 抢到票 5
小明 抢到票 4
小绿 抢到票 3
小红 抢到票 2
小红 抢到票 1
```

#### 锁同步块

> 接收一个对象，`synchronized (Obj){}`，锁的是`Synchonized`括号里配置的对象

> 注意观察下面代码`run()`方法中的`synchronized `

```java
package ginyi.com;

public class Bank {
    public static void main(String[] args) {
        Account account = new Account("工资卡", 10000);
        UserWithdraw xiaoming = new UserWithdraw(account, 2000, "小明");
        UserWithdraw xiaohong = new UserWithdraw(account, 4400, "小红");
        UserWithdraw xiaogang = new UserWithdraw(account, 6000, "小刚");

        new Thread(xiaoming).start();
        new Thread(xiaohong).start();
        new Thread(xiaogang).start();

    }
}

// 账户类
class Account {
    String name;
    int money;

    public Account(String name, int money) {
        this.name = name;
        this.money = money;
    }
}

// 用户取款
class UserWithdraw implements Runnable {
    private Account account;        // 当前账户卡
    private int withdrawMoney;      // 要取的金额
    private String who;             // 取款的人

    public UserWithdraw(Account account, int withdrawMoney, String who) {
        this.who = who;
        this.account = account;
        this.withdrawMoney = withdrawMoney;
    }

    @Override
    public void run() {
        synchronized(account){
            if (account.money - withdrawMoney <= 0) {
                System.out.println("余额不足, 当前用户【" + who + "】取钱失败！！！");
                return;
            }
            account.money = account.money - withdrawMoney;    // 卡的余额
            System.out.println("当前用户【" + who + "】取款：" + withdrawMoney);
            System.out.println(account.name + "的余额为：" + account.money);
        }
    }
}


```

### JUC并发

> `JUC`是安全类型的集合，与`ArrayList`等不安全的集合相反。

不安全的集合，使用多线程

**注意：**输出的结果，list的长度大小，不是10000，而是小于10000，故线程不安全。

**原因：**原因是有多个线程在同一时间操作了同一索引。

```java
public class ArrayListTest {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        for (int i = 0; i < 10000; i++) {
            new Thread(() -> {
                list.add(Thread.currentThread().getName());
            }).start();
        }
        System.out.println(list.size());
    }
}
```

```
9984
```

如何使得`ArrayList`成为安全的集合？解决的方法有如下`2种`。

1、使用同步锁

```java
package ginyi.com;

import java.util.ArrayList;

public class ArrayListTest {
    public static void main(String[] args) throws InterruptedException {
        ArrayList<String> list = new ArrayList<>();
        for (int i = 0; i < 10000; i++) {
            new Thread(() -> {
                synchronized (list) {
                    list.add(Thread.currentThread().getName());
                }
            }).start();
        }
        // 一定要加延时，不然main线程执行在前，导致数据不准确
        Thread.sleep(10);
        System.out.println(list.size());
    }
}
```

```
10000
```

2、使用JUC

> `CopyOnWriteArrayList`是`JUC`中，安全的集合。

```java
import java.util.concurrent.CopyOnWriteArrayList;

public class JUCTest {
    public static void main(String[] args) throws InterruptedException {
        CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();
        for (int i = 0; i < 10000; i++) {
            new Thread(() -> {
                list.add(Thread.currentThread().getName());
            }).start();
        }
        Thread.sleep(100);
        System.out.println(list.size());
    }
}
```

```
10000
```



### 死锁

> 多个线程各自占有一些共享资源，并且互相等待其他线程占有的资源才能运行，而导致两个或者多个线程都在等待对方释放资源，都停止执行的情形。即一个同步块同时同时拥有`两个以上对象的锁`时，就有可能发生死锁的问题。

> 举例：女孩化妆。共享资源有：镜子，口红。发生死锁的情况：女孩一占有镜子锁的同时，还想要口红的锁，并且女孩二占有口红锁的同时，还想要镜子的锁。

```java
package ginyi.com;

public class DeadLock {
    public static void main(String[] args) {
        new Thread(new Makeup(0, "小红")).start();
        new Thread(new Makeup(1, "小紫")).start();
    }
}

// 口红
class Lipstick {}

// 镜子
class Mirror {}

// 化妆
class Makeup implements Runnable{
    // 静态共享的资源，用static来保证只有一份
    static Lipstick lipstick = new Lipstick();
    static Mirror mirror = new Mirror();

    String girlName;    // 当前使用者
    int choice;         // 当前使用者的选择

    public Makeup(int choice, String girlName) {
        this.girlName = girlName;
        this.choice = choice;
    }

    @Override
    public void run() {
        try {
            makeup();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private void makeup() throws InterruptedException {
        if(choice == 0){
            synchronized(lipstick){
                System.out.println(this.girlName + "：拿到口红的锁");
                Thread.sleep(100);
                synchronized(mirror){
                    System.out.println(this.girlName + "：拿到镜子的锁");
                }
            }
        }else{
            synchronized(mirror){
                System.out.println(this.girlName + "：拿到镜子的锁");
                Thread.sleep(200);
                synchronized(lipstick){
                    System.out.println(this.girlName + "：拿到口红的锁");
                }
            }
        }
    }
}
```

```
小红：拿到口红的锁
小紫：拿到镜子的锁
```



如何避免死锁？

在同时抱一把锁即可，即用完就释放。修改代码如下：

```java
private void makeup() throws InterruptedException {
    if(choice == 0){
        synchronized(lipstick){
            System.out.println(this.girlName + "：拿到口红的锁");
            Thread.sleep(100);
        }
        synchronized(mirror){
            System.out.println(this.girlName + "：拿到镜子的锁");
        }
    }else{
        synchronized(mirror){
            System.out.println(this.girlName + "：拿到镜子的锁");
            Thread.sleep(200);
        }
        synchronized(lipstick){
            System.out.println(this.girlName + "：拿到口红的锁");
        }
    }
}
```

```
小红：拿到口红的锁
小紫：拿到镜子的锁
小红：拿到镜子的锁
小紫：拿到口红的锁
```



### Lock

> `Lock`是显式锁(`可手动实现加锁和释放锁`)，`synchronized`是隐式锁(`出了作用块即释放锁`)。
>
> **注意：**`lock锁`一般放在`try当`中，而`释放锁`一般放在`finally`当中，官方建议这么写



```java
package ginyi.com;

import java.util.concurrent.locks.ReentrantLock;

public class LockTest {
    public static void main(String[] args) {
        BuyTickets tickets = new BuyTickets();

        new Thread(tickets, "小明").start();
        new Thread(tickets, "小红").start();
        new Thread(tickets, "小绿").start();
    }
}

class BuyTickets implements Runnable {
    // 票数
    private int ticketNum = 10;
    // 实例lock锁
    private final ReentrantLock lock = new ReentrantLock();

    @Override
    public void run() {
        while (true) {
            try {
                // 加锁
                lock.lock();
                if (ticketNum > 0) {
                    System.out.println(Thread.currentThread().getName() + "拿到" + ticketNum--);
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } else {
                    break;
                }
            } finally {
                // 解锁
                lock.unlock();
            }
        }
    }
}
```

 ```
小明拿到 10
小红拿到 9
小绿拿到 8
小绿拿到 7
小绿拿到 6
小红拿到 5
小红拿到 4
小红拿到 3
小红拿到 2
小红拿到 1
 ```

### 线程池

> 背景：经常创建和销毁、使用量特别大的资源，比如并发情况下的线程，对性能影响很大。
>
> 思路：提前创建好多个线程，放入线程池中，使用时直接获取，使用完放回池中。可以避免频繁创建销毁、实现重复利用。
>
> 好处：
>
> 1. 提高响应速度（减少了创建新线程的时间）
> 2. 降低资源消耗（重复利用线程池中的线程，不需要每次都创建）
> 3. 便于线程管理
>    1. `corePoolSize`：核心池的大小
>    2. `maximumPoolSize`：最大线程数
>    3. `keepAliveTime`：线程没有任务时最多保持多长时间后终止



> ```java
> // 创建线程池服务, newFixedThreadPool参数是线程池大小
> ExecutorService service = Executors.newFixedThreadPool(10);
> 
> // 执行
> service.execute(new MyThread());
> 
> // 关闭服务
> service.shutdown();
> ```

```java
package ginyi.com;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class PoolTest {

    public static void main(String[] args) {
        // 创建线程池服务, newFixedThreadPool参数是线程池大小
        ExecutorService service = Executors.newFixedThreadPool(10);

        // 执行
        service.execute(new MyThread());
        service.execute(new MyThread());
        service.execute(new MyThread());
        service.execute(new MyThread());

        // 关闭服务
        service.shutdown();
    }
}

class MyThread implements Runnable {

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName());
    }
}
```

```
pool-1-thread-1
pool-1-thread-4
pool-1-thread-3
pool-1-thread-2
```





## **Java 注解和反射**

### 注解

> Java 注解（Annotation）又称 Java 标注，是 `JDK5.0` 引入的一种注释机制

内置的注解：Java 定义了一套注解，共有 7 个，3 个在 `java.lang` 中，剩下 4 个在 `java.lang.annotation` 中。



*作用在代码的注解的含义如下*

| 注解名称               | 含义                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `@Override`            | 检查该方法是否是重写方法。如果发现其父类，或者是引用的接口中并没有该方法时，会报编译错误。 |
| `@Deprecated`          | 标记过时方法。如果使用该方法，会报编译警告。                 |
| `@SuppressWarnings`    | 指示编译器去忽略注解中声明的警告。(需要传参，all表示所有，unchecked表示未检查的等等) |
| `@Retention`           | 标识这个注解怎么保存，是只在代码中，还是编入class文件中，或者是在运行时可以通过反射访问。 |
| `@Documented`          | 标记这些注解是否包含在用户文档中。                           |
| `@Target`              | 标记这个注解应该是哪种 Java 成员。                           |
| `@Inherited`           | 标记这个注解是继承于哪个注解类(默认 注解并没有继承于任何子类) |
| `@SafeVarargs`         | Java 7 开始支持，忽略任何使用参数为泛型变量的方法或构造函数调用产生的警告。 |
| `@FunctionalInterface` | Java 8 开始支持，标识一个匿名函数或函数式接口。              |
| `@Repeatable`          | Java 8 开始支持，标识某注解可以在同一个声明上使用多次。      |

> 其中，**作用在代码的注解有如下3个：**
>
> 1. `@Override`
> 2. `@Deprecated`
> 3. `@SuppressWarnings`
>
> 其次，**作用在其他注解的注解`(元注解)`有如下4个：**
>
> 1. `@Retention`
> 2. `@Documented`
> 3. `@Target`
> 4. `@Inherited`
>
> 最后，**从 Java 7 开始，额外添加了 3 个注解：**
>
> 1. `@SafeVarargs`
> 2. `@FunctionalInterface`
> 3. `@Repeatable`





#### 作用在代码的注解

##### @Override

> 检查该方法是否是重写方法。如果发现其父类，或者是引用的接口中并没有该方法时，会报编译错误。

```java
// 方法重写的注解
@Override
public String toString() {
    return super.toString();
}
```

##### @Deprecated

> 标记过时方法。如果使用该方法，会报编译警告（该方法已废弃）。

```java
// 表示方法已废弃的注解，提示程序员该方法不推荐被使用
@Deprecated
public static void testDeprecated(){
    System.out.println("===== 废弃的方法，不推荐程序员使用它，但它还是可以使用的 =====");
}
```

##### @SuppressWarnings

> 指示编译器去忽略注解中声明的警告。(需要传参，all表示所有，unchecked表示未检查的等等)

```java
// 镇压警告，声明testSuppressWarnings方法后没有被使用,系统会提示该方法未被使用,使用@SuppressWarnings("all")后警告消失.
@SuppressWarnings("all")
public void testSuppressWarnings(){
    ArrayList<String> list = new ArrayList<>();
}
```



#### 元注解(作用在注解上)

##### @Target

> 标记这个注解应该是哪种 Java 成员。
>
> `简单点说就是：`表示我们的注解可以用在什么地方，类上，方法上，构造函数上等等

`value`的值可以是单个值，也可以是个数组

```java
// 自定义注解
// 指定只能在方法上使用
@Target(value = ElementType.METHOD)
@interface MyAnnotation{

}

// 自定义注解2
// 指定可以在方法上和类上使用
@Target(value = {ElementType.METHOD, ElementType.TYPE})
@interface MyAnnotation2{

}
```

`ElementType`是枚举类，具体如下：

```java
public enum ElementType {
    /** 意味着，它能标注"类、接口（包括注释类型）或枚举声明"。 */
    TYPE,

    /** 意味着，它能标注"字段声明"。 */
    FIELD,

    /** 意味着，它能标注"方法"。 */
    METHOD,

    /** 意味着，它能标注"参数"。 */
    PARAMETER,

    /** 意味着，它能标注"构造方法"。 */
    CONSTRUCTOR,

    /** 意味着，它能标注"局部变量"。 */
    LOCAL_VARIABLE
}
```

使用自定义注解

```java
// 测试元注解
@MyAnnotation2
public class SourceAnnotation {

    // 使用自定义注解
    @MyAnnotation
    public void testTarget(){
        System.out.println("因为自定义Target时, 指定了 METHOD, 所以只能在方法上使用");
    }
}
```



##### @Retention

> 标识这个注解怎么保存，是只在代码中，还是编入class文件中，或者是在运行时可以通过反射访问。
>
> `简单点说就是：`表示我们的注解在什么地方还有效，源码级别，class级别，运行时级别
>
> 级别关系：`RUNTIME > CLASS > SOURCE`

```JAVA
// 作用在类上和方法上
@Target(value = {ElementType.TYPE, ElementType.METHOD})
// 运行时有效(兼容class, source级别)
@Retention(value = RetentionPolicy.RUNTIME)
@interface MyAnnotation3{

}
```

`RetentionPolicy`是枚举类，具体如下：

```java
public enum RetentionPolicy {
    /**
     * 源码级别，在源码时有效
     */
    SOURCE,

    /**
     * class级别，在class文件时有效，兼容SOURCE级别
     */
    CLASS,

    /**
     * 运行时有效，兼容CLASS、SOURCE级别
     */
    RUNTIME
}
```

使用自定义注解

```java
// 使用自定义注解
@MyAnnotation3
public class SourceAnnotation2 {

}
```



#### 自定义注解

>1. @interface用来声明一个注解，格式：public @interface 注解名 {定义内容}
>2. 其中的每一个方法实际上是声明了一个配置参数
>3. 方法的名称就是参数的名称
>4. 返回值类型就是参数的类型（返回值只能是基本类型）
>5. 可以通过default来声明参数的默认值
>6. 如果只有一个参数成员，一般推荐使用value作为参数名
>7. 注解元素必须要有值，我们定义注解元素时，经常使用空字符串，0作为默认值

```java
// 指定作用位置：class 和 method
@Target(value = {ElementType.TYPE, ElementType.METHOD})
// 指定在什么地方还有效：运行时
@Retention(value = RetentionPolicy.RUNTIME)
@interface MyAnnotation4{
    // 参数类型 参数名()
    String name();

    // 可以设置默认值
    int age() default 0;
    int id() default -1;

    // 可以是数组类型
    String[] school();
}
```

使用自定义注解

```java
public class DefinedAnnotation {
    // 有默认值值的可以不传
    @MyAnnotation4(name = "要给注解的 name 赋值", school = {"abc大学", "cde大学"})
    public void testMyAnnotation4(){

    }
}
```

如果注解只有一个值，可以使用`value`，代码如下：

```java
@Target(value = {ElementType.TYPE, ElementType.METHOD})
@Retention(value = RetentionPolicy.RUNTIME)
@interface MyAnnotation5{
    // 只有一个参数时，建议使用 value 命名, 使用时可以省略 value = 
    String value();
}
```

使用自定义注解

```java
public class DefinedAnnotation {
    // 不省略value
    @MyAnnotation5(value = "给注解传值")
    // 可以省略value (如果参数名不是value的话，是不可以省略的)
    @MyAnnotation5("给注解传值")
    public void testMyAnnotation5(){

    }
}
```





### 反射

#### 反射机制的概述

> 通过`java`语言中的反射机制`可以操作字节码文件`（可以读和修改字节码文件）
>
> 通过反射机制`可以操作代码片段`（class文件）
>
> 通过反射机制，可以使得Java语言变成`动态语言`，直接操作任意对象的内部属性和方法

反射机制的相关类位于`reflect`下

```java
java.lang.reflect.*;
```



#### 反射机制重要的类

| 类                              | 含义                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| `java.lang.Class`               | 代表整个字节码。代表一个类型，代表整个类。                   |
| `java.lang.reflect.Method`      | 代表字节码中的方法字节码。代表类中的方法。                   |
| `java.lang.reflect.Constructor` | 代表字节码中的构造方法字节码。代表类中的构造方法。           |
| `java.lang.reflect.Field`       | 代表字节码中的属性字节码。代表类中的成员变量（静态变量+实例变量）。 |

> **注意**：必须先获得Class才能获取Method、Constructor、Field。





#### 获取Class的三种方式

| 方式                             | 备注                       |
| -------------------------------- | -------------------------- |
| `Class.forName("完整包名.类名")` | 静态方法                   |
| `对象.getClass()`                | 需要先new出对象            |
| `类.class`                       | 需要知道一个类，如Person类 |
| `子类型.getSuperclass()`         | 获取父类类型               |

**注意：**以上三种方式返回值都是**Class类型**

```java
package ginyi.com;

public class Test01 {
    public static void main(String[] args) throws ClassNotFoundException {
        Person person = new Student();
        System.out.println("这个人是: " + person.name);

        // 方式一: 通过getClass()获取
        Class<?> c2 = person.getClass();
        System.out.println(c2.hashCode());

        // 方式二: 通过反射获取类的class对象
        Class<?> c1 = Class.forName("ginyi.com.Student");
        System.out.println(c1.hashCode());

        // 方式三: 通过类名.class获得
        Class<Student> c3 = Student.class;
        System.out.println(c3.hashCode());

        // 获取父类类型
        Class<?> c5 = c1.getSuperclass();
        System.out.println(c5);
    }
}

class Person{
    public String name;
    public Person() {}

}

class Student extends Person{
    public Student() {
        this.name = "学生";
    }
}

class Teacher extends Person{
    public Teacher() {
        this.name = "学生";
    }
}

```

```
这个人是: 学生
460141958
460141958
460141958
class ginyi.com.Person
```



#### 获取类运行时的结构

> 通过反射获取运行时类的完整结构，可获取`Field `、`Method`、`Constructor`、`Superclass `、`Interface`、`Annotation` 

| 方法名                                           | 作用                                  |
| ------------------------------------------------ | ------------------------------------- |
| `类.getName()`                                   | 获取类的名字`(包名 + 类名)`           |
| `类.getSimpleName()`                             | 获取类的简单名字`(即类名)`            |
| `类.getFields()`                                 | 获取类的所有`非private`的属性         |
| `类.getDeclaredFields()`                         | 获取类的所有属性`(包括private)`       |
| `类.getField(name)`                              | 获取`指定属性名`的属性`(非private)`   |
| `类.getDeclaredField(name)`                      | 获取`指定属性名`的属性`(包括private)` |
| `类.getMethods()`                                | 获取类的所有`非private的方法`         |
| `类.getDeclaredMethods()`                        | 获取类的所有方法`(包括peivate)`       |
| `类.getMethod(name)`                             | 获取`指定方法名`的方法`(非private)`   |
| `类.getDeclaredMethod(name)`                     | 获取`指定方法名`的方法`(包括private)` |
| `类.getConstructors()`                           | 获取类的所有构造函数`(非private)`     |
| `类.getDeclaredConstructors()`                   | 获取类的所有构造函数`(包括private)`   |
| `类.getConstructor(属性类型.class, ...)`         | 获取类指定的构造器`(非private)`       |
| `类.getDeclaredConstructor(属性类型.class, ...)` | 获取类指定的构造器`(包括private)`     |

```java
package ginyi.com;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class Test01 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchFieldException, NoSuchMethodException {
        // 获取class类
        Class<?> c1 = Class.forName("ginyi.com.Person");

        // 获取类的名字(包名 + 类名)
        String name = c1.getName();
        // 获取类的简单名字
        String simpleName = c1.getSimpleName();

        // 获取类的所有属性(不包括private)
        Field[] fields = c1.getFields();
        // 获取类的所有属性(包括private)
        Field[] declaredFields = c1.getDeclaredFields();
        // 获取指定的属性(无法获取private的属性)
        Field fieldName = c1.getField("name");
        // 获取指定的属性(包括private的属性)
        Field fieldAge = c1.getDeclaredField("age");

        // 获取类的所有方法(不包括private)
        Method[] methods = c1.getMethods();
        // 获取类的所有方法(包括private)
        Method[] declaredMethods = c1.getDeclaredMethods();
        // 获取指定名字的方法(不包括private)
        Method method = c1.getMethod("test01");
        // 获取指定名字的方法(包括private)
        Method declaredMethod = c1.getDeclaredMethod("test02");
        
        // 获取类的所有构造方法(不包括private)
        Constructor<?>[] constructors = c1.getConstructors();
        // 获取类的所有构造方法(包括private)
        Constructor<?>[] declaredConstructors = c1.getDeclaredConstructors();
        // 获取指定参数类型的构造方法(不包括private)
        Constructor<?> constructor = c1.getConstructor();
        // 获取指定参数类型的构造方法(包括private)
        Constructor<?> declaredConstructor = c1.getDeclaredConstructor(String.class, int.class, int.class);
    }
}

class Person{
    public String name;
    private int age;
    public int id;

    public Person() {}

    public Person(String name, int age, int id) {
        this.name = name;
        this.age = age;
        this.id = id;
    }

    public void test01(){}
    private void test02(){}

}
```



#### 动态创建对象执行方法(动态代理)

##### 通过反射创建对象

*使用反射机制创建对象`(以前)`*，**不推荐使用**

> 无参构造函数：`类.newInstance()` 
>
> **注意：**只能实例化无参的！

*使用反射机制创建对象`(现在)`*

> 无参构造函数：`类.getDeclaredConstructor().newInstance()` 
>
> 有参构造函数：`类.getDeclaredConstructor(属性类型.class, ...).newInstance(属性值, ...)`

```java
package ginyi.com;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

public class Test02 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {

        Class<?> c1 = Class.forName("ginyi.com.Person2");

        // (无参) 过时的方法，不建议使用
        Person2 person01 = (Person2) c1.newInstance();
        System.out.println("过时的(无参)：" + person01);

        // (无参) 现在使用的方式
        Constructor<?> declaredConstructor01 = c1.getDeclaredConstructor();
        Person2 person03 = (Person2) declaredConstructor01.newInstance();
        System.out.println("现在的(无参)：" + person03);

        // (有参) 现在使用的方式
        Constructor<?> declaredConstructor02 = c1.getDeclaredConstructor(String.class, int.class, int.class);
        Person2 person04 = (Person2) declaredConstructor02.newInstance("张三", 20, 30);
        System.out.println("现在的(有参)：" + person04);

    }
}

class Person2 {
    public String name;
    private int age;
    public int id;

    public Person2() {
    }

    public Person2(String name, int age, int id) {
        this.name = name;
        this.age = age;
        this.id = id;
    }

    public void test01() {
    }

    private void test02() {
    }

    @Override
    public String toString() {
        return "Person2{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", id=" + id +
                '}';
    }
}
```

```
过时的(无参)：Person2{name='null', age=0, id=0}
现在的(无参)：Person2{name='null', age=0, id=0}
现在的(有参)：Person2{name='张三', age=20, id=30}
```



##### 通过反射调用方法

> 首先，通过反射实例化创建对象
>
> 其次，通过反射获取方法，使用`方法.invoke(当前方法隶属的对象, 方法的参数值)`激活方法

```java
package ginyi.com;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class Test02 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {

        // 实例化对象
        Class<?> c1 = Class.forName("ginyi.com.Person2");
        Person2 person01 = (Person2) c1.newInstance();

        // 通过反射调用方法
        Method setName = c1.getDeclaredMethod("setName", String.class);
        // 激活方法, 第一个参数是当前方法隶属的对象, 第二个参数是传值
        setName.invoke(person01, "张三");
        System.out.println(person01.getName());
    }
}

class Person2 {
    public String name;
    private int age;
    public int id;

    public Person2() {
    }

    public Person2(String name, int age, int id) {
        this.name = name;
        this.age = age;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Person2{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", id=" + id +
                '}';
    }
}
```

##### 通过反射操作属性

> 通过反射操作属性时，经常会遇到`private`私有属性，导致权限不足而报错
>
> 解决方法：`属性.setAccessible(true)`，绕过权限检测

```java
package ginyi.com;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;

public class Test02 {
    public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException, NoSuchFieldException {

        Class<?> c1 = Class.forName("ginyi.com.Person2");
        Person2 person01 = (Person2) c1.newInstance();

        // 通过反射获取属性
        Field age = c1.getDeclaredField("age");
        // 关闭权限检测
        age.setAccessile(true);
       	// 给属性赋值 第一个参数：当前属性所在的对象, 第二个参数：要赋的值
        age.set(person01, 20);
        System.out.println(person01.getAge());
    }
}

class Person2 {
    public String name;
    private int age;
    public int id;

    public Person2() {
    }

    public Person2(String name, int age, int id) {
        this.name = name;
        this.age = age;
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person2{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", id=" + id +
                '}';
    }
}
```

##### 性能对比分析

>**结论：**`普通方式` > `反射(关闭权限检测)` > `反射`
>
>**建议：**如果反射用得多的话，关闭安全检测，可以提高性能

```java
package ginyi.com;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class Test02 {
    public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException, NoSuchFieldException, NoSuchMethodException, InvocationTargetException {

        // 普通方式
        Person2 person1 = new Person2();
        long start1 = System.currentTimeMillis();
        for (int i = 0; i < 1000000000; i++) {
            person1.getAge();
        }
        long end1 = System.currentTimeMillis();
        System.out.println("普通方式执行10亿次, 耗时：" + (end1 - start1) + "ms");

        
        // 反射方式
        Class<?> c1 = Class.forName("ginyi.com.Person2");
        Person2 person2 = (Person2) c1.newInstance();
        Method getAge = c1.getDeclaredMethod("getAge", null);
        long start2 = System.currentTimeMillis();
        for (int i = 0; i < 1000000000; i++) {
            getAge.invoke(person2, null);
        }
        long end2 = System.currentTimeMillis();
        System.out.println("反射方式执行10亿次, 耗时：" + (end2 - start2) + "ms");


        // 反射方式, 关闭权限检测
        Class<?> c2 = Class.forName("ginyi.com.Person2");
        Person2 person3 = (Person2) c2.newInstance();
        Method getAge2 = c1.getDeclaredMethod("getAge", null);
        // 关闭安全权限检测
        getAge2.setAccessible(true);
        
        long start3 = System.currentTimeMillis();
        for (int i = 0; i < 1000000000; i++) {
            getAge.invoke(person2, null);
        }
        long end3 = System.currentTimeMillis();
        System.out.println("关闭检测执行10亿次, 耗时：" + (end3 - start3) + "ms");

    }
}

class Person2 {
    public String name;
    private int age;
    public int id;

    public Person2() {
    }

    public Person2(String name, int age, int id) {
        this.name = name;
        this.age = age;
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person2{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", id=" + id +
                '}';
    }
}
```

```
普通方式执行10亿次, 耗时：3ms
反射方式执行10亿次, 耗时：2367ms
关闭检测执行10亿次, 耗时：2100ms
```



##### 通过反射获取泛型信息

> Java采用`泛型擦除机制`来引入泛型，Java中的泛型`仅仅是给编译器javac`使用的，确保数据的安全性和免去强制类型转换问题，但是，`一旦编译完成，所有和泛型有关的类型全部擦除`。
>
> 为了通过反射操作这些类型，Java新增了`ParameterizedType`、`GenericArrayType`、`TypeVariable`、`WildcardType`几种类型来代表不能被归一到class类中的类型但是又和原始类型齐名的类型。

> `ParameterizedType`: 表示一种参数化类型，比如`Collection<String>`
>
> `GenericArrayType`: 表示一种元素类型是参数化类型或者类型变量的数组类型
>
> `TypeVariable`: 是各种类型变量的公共父接口
>
> `WildcardType`: 代表一种通配符类型表达式

| 方法名                              | 含义                 |
| ----------------------------------- | -------------------- |
| `方法名.getGenericParameterTypes()` | 获取泛型参数的信息   |
| `方法名.getGenericReturnType()`     | 获取泛型返回值的信息 |
| `方法名.getGenericExceptionTypes()` | 获取泛型异常的信息   |



```java
package ginyi.com;

import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

// 通过反射获取泛型
public class Test03 {

    public void test01(Map<String, Integer> map, List<Double> list){
        System.out.println("test01");
    }

    public Map<String, Integer> test02(){
        System.out.println("test02");
        return null;
    }

    public static void main(String[] args) throws NoSuchMethodException {
        // 反射获取类的方法
        Method method01 = Test03.class.getMethod("test01", Map.class, List.class);
        // 获得泛型的参数信息
        Type[] parameterTypes = method01.getGenericParameterTypes();

        for (Type parameterType : parameterTypes) {
            System.out.println("#" + parameterType);
            // 获取泛型的真实类型信息，实际上需要获取返回值类型中的泛型信息，所以要进一步判断，即判断获取的返回值类型是否是参数化类型ParameterizedType
            if (parameterType instanceof ParameterizedType) {
                // 如果要使用ParameterizedType中的方法，必须先强制向下转型
                Type[] actualTypeArguments = ((ParameterizedType) parameterType).getActualTypeArguments();
                for (Type actualTypeArgument : actualTypeArguments) {
                    System.out.println("真实的参数信息：" + actualTypeArgument);
                }
            }
        }


        // 反射获取类的方法
        Method method02 = Test03.class.getMethod("test02");
        // 获得泛型的返回值信息
        Type returnType = method02.getGenericReturnType();
        System.out.println("#" + returnType);
	    // 获取泛型的真实类型信息，实际上需要获取返回值类型中的泛型信息，所以要进一步判断，即判断获取的返回值类型是否是参数化类型ParameterizedType
        if (returnType instanceof ParameterizedType) {
            // 如果要使用ParameterizedType中的方法，必须先强制向下转型
            Type[] actualTypeArguments = ((ParameterizedType) returnType).getActualTypeArguments();
            for (Type actualTypeArgument : actualTypeArguments) {
                System.out.println("参数泛型的真实信息：" + actualTypeArgument);
            }
        }
    }
}
```

```
#java.util.Map<java.lang.String, java.lang.Integer>
真实的参数信息：class java.lang.String
真实的参数信息：class java.lang.Integer

#java.util.List<java.lang.Double>
真实的参数信息：class java.lang.Double

#java.util.Map<java.lang.String, java.lang.Integer>
参数泛型的真实信息：class java.lang.String
参数泛型的真实信息：class java.lang.Integer
```

##### 通过反射获取注解信息

> 步骤：
>
> 1. 自定义注解
> 2. 给属性赋值
> 3. 反射获取类
> 4. 获取注解类的信息
> 5. 获取注解的value



```java
package ginyi.com;

import java.lang.annotation.*;
import java.lang.reflect.Field;

public class Test04 {
    public static void main(String[] args) throws ClassNotFoundException {
        // 反射获取类
        Class<?> c1 = Class.forName("ginyi.com.Student");

        // 获取作用在该类上的注解信息
        Annotation[] annotations = c1.getAnnotations();
        for (Annotation annotation : annotations) {
            System.out.println(annotation);
        }

        // 获取指定类的注解的值(先获取到对应注解的信息)
        MyTable MyTable = c1.getAnnotation(MyTable.class);
        System.out.println(MyTable.value());

        // 获取指定类属性的注解的值
        Field[] fields = c1.getDeclaredFields();
        for (Field field : fields) {
            System.out.println(field);
            MyTableColumn annotation = field.getAnnotation(MyTableColumn.class);
            System.out.println(annotation.name());
            System.out.println(annotation.type());
            System.out.println(annotation.length());
        }
    }

}

// 学生类（使用注解）
@MyTable(value = "db_name")
class Student{

    @MyTableColumn(name = "db_id", type = "Integer", length = 10)
    private int id;
    @MyTableColumn(name = "db_age", type = "Integer", length = 10)
    private int age;
    @MyTableColumn(name = "db_name", type = "Varchar", length = 100)
    private String name;

}

// 自定义注解
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@interface MyTable{
    String value();
}

// 自定义注解
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@interface MyTableColumn{
    String name();
    String type();
    int length();
}
```

```
@ginyi.com.MyTable(value=db_name)
db_name

private int ginyi.com.Student.id
db_id
Integer
10

private int ginyi.com.Student.age
db_age
Integer
10

private java.lang.String ginyi.com.Student.name
db_name
Varchar
100
```





## **Java IO**

### File类

> File: 它是文件和目录路径名的抽象表示
>
> 1. 文件和目录是可以通过File封装成对象的
> 2. 对于File而言，其封装的并不是真正存在的文件，仅仅是一个路径名而已，它可以是存在的，也可以是不存在的。将来是要通过具体的操作把这个路径的内容转换为具体存在的



`File类的构造方法`

| 方法名                              | 说明                                                       |
| ----------------------------------- | ---------------------------------------------------------- |
| `File(String pathname)`             | 通过将给定的路径名字符串转换为抽象路径名来创建新的File实例 |
| `File(String parent, String child)` | 从父路径名字字符串和子路径名字符串创建新的File实例         |
| `File(File parent, String child)`   | 从父抽象路径名和子路径名字符串创建新的File实例             |

```java
package ginyi.com;

import java.io.File;

public class Test01 {
    public static void main(String[] args) {
        // 全路径
        File file1 = new File("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\a.txt");
        System.out.println(file1);

        // 父路径 + 子路径
        File file2 = new File("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile", "a.txt");
        System.out.println(file2);

        // 先创建file实例，再创建文件
        File file = new File("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile");
        File file3 = new File(file, "a.txt");
        System.out.println(file3);
    }
}

```

```
E:\Data-Git\Java\Demo\JavaIO\TestFile\a.txt
E:\Data-Git\Java\Demo\JavaIO\TestFile\a.txt
E:\Data-Git\Java\Demo\JavaIO\TestFile\a.txt
```

#### File类创建功能

| 方法名                           | 说明                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| `public boolean createNewFile()` | 当具有该名称的文件不存在时，创建一个由该抽象路径名的新空文件 |
| `public boolean mkdir()`         | 创建由此抽象路径名命名的目录                                 |
| `public boolean mkdirs()`        | 创建由此抽象路径名命名的目录，包括任何必需但不存的父目录     |



```java
package ginyi.com;

import java.io.File;
import java.io.IOException;

public class Test02 {
    public static void main(String[] args) throws IOException {
        // 创建文件
        File file = new File("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\a.txt");
        System.out.println(file.createNewFile());

        // 创建目录
        File file1 = new File("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\TestMkdir");
        System.out.println(file1.mkdir());

        // 创建多级目录
        File file2 = new File("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\TestMkdir1\\TestMkdir2");
        System.out.println(file2.mkdirs());
    }
}
```

```
false
true
true
```

#### File类判断和获取功能

| 方法名                            | 说明                                                     |
| --------------------------------- | -------------------------------------------------------- |
| `public boolean isDirectory()`    | 测试此抽象路径名表示的File是否为目录                     |
| `public boolean isFile()`         | 测试此抽象路径名表示的File是否为文件                     |
| `public boolean exists()`         | 测试此抽象路径名表示的File是否存在                       |
| `public String getAbsolutePath()` | 返回此抽象名的绝对路径名                                 |
| `public String getPath()`         | 返回此抽象路径名转换为路径名字符串                       |
| `public String getName()`         | 返回此抽象名路径表示的文件或目录的名称                   |
| `public String[] list()`          | 返回此抽象路径名表示的目录中的文件和目录的名称字符串数组 |
| `public File[] listFiles()`       | 返回此抽象路径名表示的目录中的文件和目录的File对象数组   |

```java
package ginyi.com;

import java.io.File;

public class Test03 {

    public static void main(String[] args) {
        File file = new File("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\a.txt");
        System.out.println("===== 判断 ======");
        System.out.println(file.exists());
        System.out.println(file.isDirectory());
        System.out.println(file.isFile());

        System.out.println("===== 获取 ======");
        System.out.println(file.getAbsoluteFile());
        System.out.println(file.getPath());
        System.out.println(file.getName());

        System.out.println("===== 获取 ======");
        File file1 = new File("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\TestMkdir1");
        String[] list = file1.list();
        for (String s : list) {
            System.out.println(s);
        }

        System.out.println("===== 获取 + 判断 =====");
        File file2 = new File("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\TestMkdir1");
        File[] files = file2.listFiles();
        for (File f : files) {
            if (f.isFile()) {
                System.out.println(f);
            }
        }
    }
}
```

```
===== 判断 ======
true
false
true

===== 获取 ======
E:\Data-Git\Java\Demo\JavaIO\TestFile\a.txt
E:\Data-Git\Java\Demo\JavaIO\TestFile\a.txt
a.txt

===== 获取 ======
TestFile0001.js
TestMkdir03
TestMkdir2

===== 获取 + 判断 =====
E:\Data-Git\Java\Demo\JavaIO\TestFile\TestMkdir1\TestFile0001.js
```

#### File类删除功能

| 方法名                    | 说明                               |
| ------------------------- | ---------------------------------- |
| `public boolean delete()` | 删除由此抽象路径名表示的文件或目录 |

**注意：**如果目录下有文件，则不能直接删除该目录。应该先删除文件再删除目录。

```java
package ginyi.com;

import java.io.File;
import java.io.IOException;

public class Test04 {
    public static void main(String[] args) throws IOException {
        // 创建文件
        File file = new File("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\TestMkdir\\b.txt");
        System.out.println(file.createNewFile());

        // 目录下有文件，删除失败
        File file1 = new File("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\TestMkdir");
        System.out.println(file1.delete());

        // 先删除文件
        System.out.println(file.delete());
        // 再删除目录
        System.out.println(file1.delete());
    }
}
    
```

```
true
false
true
true
```

#### File案例

> 输出指定目录下的所有文件路径

```java
package ginyi.com;

import java.io.File;

public class Test06 {

    public static void main(String[] args) {
        File file = new File("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile");
        get_all_file_path(file);
    }

    public static void get_all_file_path(File file){
        File[] files = file.listFiles();
        if(files != null){
            for (File f : files) {
                if (f.isDirectory()) {
                    get_all_file_path(f);
                }else {
                    System.out.println(f.getAbsoluteFile());
                }
            }
        }
    }
}
```

```
E:\Data-Git\Java\Demo\JavaIO\TestFile\a.txt
E:\Data-Git\Java\Demo\JavaIO\TestFile\TestMkdir1\TestFile0001.js
E:\Data-Git\Java\Demo\JavaIO\TestFile\TestMkdir1\TestMkdir03\158.py
```

### IO流

>IO流概述：
>
>- IO：输入/输出(`Input`/`Output`)
>- 流：是一种概念，是对数据传输的总称，也就是收哦数据在设备的传输称为流，流的本质是数据传输
>- IO流就是用来处理设备间数据传输问题的
>- 常见的应用：文件复制；文件上传下载
>
>IO流的分类：
>
>- 按照数据的流向
>  - 输入流：读取数据
>  - 输出流：写数据
>- 按照数据类型来分
>  - 字节流(`人看不懂的，使用字节流，如图片文件用记事本打开，一串奇奇怪怪的符号，看不懂`)：
>    - 字节输入流
>    - 字节输出流
>  - 字符流(`人能看懂的，使用字符流，如文本文件txt用记事本打开，中文可以看懂`)：
>    - 字符输入流
>    - 字符输出流
>
>**注意：**如果不知道使用哪种流，就使用`字节流`，它是一种`通用的IO流`



#### 字节流

> 字节流抽象基类
>
> - `InputStream`：这个抽象类是表示字节输入流的所有类的超类
> - `OutputStream`：这个抽象类是表示字节输出流的所有类的超类
> - 子类名特点：子类名称都是以其父类名作为子类名的后缀

##### 字节流`写入`数据

| 构造函数                                        | 说明                                           |
| ----------------------------------------------- | ---------------------------------------------- |
| `FileOutputStream(String path, Boolean append)` | `path`全路径名字符串，`append`是否追加写入数据 |

> `FileOutputStream`：文件输出流用于将数据写入File
>
> - `FileOutputStream(String name, Boolean append)`：创建文件输出流以指定的名称写入文件

```java
package ginyi.com;

import java.io.FileOutputStream;
import java.io.IOException;

public class Test07 {

    public static void main(String[] args) throws IOException {
        // 创建字节流输出对象
        FileOutputStream fos = new FileOutputStream("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\a.txt");
        // 将指定字节写入此文件输出流
        fos.write(97);
    }
}
```

`a.txt`写入的内容是(ASCII码)

```
a
```

##### 字节流写数据的3种方式

| 方法名                                             | 说明                                                         |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `public void write(int b)`                         | 将指定的字节写入此文件输出流，一次写一个`字节`的数据         |
| `public void write(byte[] b)`                      | 将指定的字节写入此文件输出流，一次写一个`字节数组`的数据     |
| `public void write(byte[] b, int off, int length)` | 将指定的字节写入此文件输出流，一次写一个`字节数组指定偏移量off`的数据 |

```java
package ginyi.com;

import java.io.FileOutputStream;
import java.io.IOException;

public class Test08 {
    public static void main(String[] args) throws IOException {

        FileOutputStream fos = new FileOutputStream("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\a.txt");

        // 一次写一个字节
        byte[] bytes = new byte[]{97, 98, 99, 100};
        for (byte b : bytes) fos.write(b);

        // 一次写一个字节数组
        byte[] bytes1 = "\nhello world\n".getBytes();
        fos.write(bytes1);

        // 一次写入一个指定偏移量的字节数组
        byte[] bytes2 = {97, 98, 99, 100, 101, 102};
        fos.write(bytes2, 0, bytes2.length);

        // 释放资源
        fos.close();
    }
}

```

```
abcd
hello world
abcdef
```

##### 字节流写数据加异常处理

> `finally`：在异常处理时提供finally块来执行所有清除操作，比如说IO流中的释放资源

```java
package ginyi.com;

import java.io.FileOutputStream;
import java.io.IOException;

public class Test09 {
    public static void main(String[] args) throws IOException {
        // 提升fos作用域
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\a.txt");
            byte[] bytes = new byte[]{97, 98, 99, 100};
            for (byte b : bytes) fos.write(b);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fos != null) {
                fos.close();
            }
        }
    }
}

```

```
abcd
```



##### 字节流`读取`数据

> `FileInputStream`：从文件系统中的文件获取输入字节
>
> - `FileInputStream(String name)`：通过打开与实际文件的连接来创建一个`FileInputStream`，该文件由文件系统中的`路径名name命名`

```java
package ginyi.com;

import java.io.FileInputStream;
import java.io.IOException;

public class Test10 {
    public static void main(String[] args) throws IOException {
        // 初始化读取字节流的变量
        FileInputStream fis = null;
        // 用于接收读取出来的字节
        int read;
        
        try {
            fis = new FileInputStream("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\a.txt");
            while ((read = fis.read()) != -1) {
                System.out.print((char) read);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            fis.close();
        }
    }
}

```

```
abcd
```



##### 字节缓冲流

> 字节缓冲流：
>
> - `BufferOutputStream`：该类实现缓冲输出流。通过设置这样的输出流，应用程序可以向底层输出流写入字节，而不必为写入的每个字节导致底层系统的调用
> - `BufferedOutputStream`：创建`BufferedOutputStream`将创建一个内部缓冲数组。当从流中读取或跳过字节时，内部缓冲区将根据需要从所包含的输入流中重新填充，一次很多字节。
>
> **注意：**字节缓冲流`仅仅提供缓冲区`，而真正的读写数据还得依靠基本的字节流对象进行操作。

`构造方法`

| 方法名                                   | 说明           |
| ---------------------------------------- | -------------- |
| `BufferedOutputStream(OutputStream out)` | 字节缓冲输出流 |
| `BufferedInputStream(InputStream in)`    | 字节缓冲输入流 |



```java
package ginyi.com;

import java.io.*;

public class Test11 {
    public static void main(String[] args) throws IOException {
        // 使用字节流缓冲区写入数据
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\a.txt"));
        bos.write("hello world".getBytes());
        bos.close();
    }
}

```

```java
package ginyi.com;

import java.io.*;

public class Test11 {
    public static void main(String[] args) throws IOException {
        // 使用字节流缓冲区读取数据
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream("E:\\Data-Git\\Java\\Demo\\JavaIO\\TestFile\\a.txt"));

        byte[] bytes = new byte[1024];
        int len;
        while((len = bis.read(bytes)) != -1){
            System.out.println(new String(bytes, 0, len));
        }
        bis.close();
    }
}
```



#### 字符流

> 字符流出现的原因:由于 [字节流](https://so.csdn.net/so/search?q=字节流&spm=1001.2101.3001.7020) 操作中文不是特别方便，所以，java就提供了字符流。
> 字符流: 字符流 = 字节流 + 编码表









## **Spring**

> 1. Spring是`轻量级`的、`开源的JavaEE框架`
> 2. 可以解决企业应用开发的复杂性
> 3. Spring有两个核心部分：`IOC和Aop`
>    1. `IOC`：控制反转，把创建对象的过程交个Spring进行管理
>    2. `Aop`：面向切面，不修改源代码进行功能增强
> 4. Spring特点
>    1. 方便解耦，简化开发
>    2. Aop编程支持
>    3. 方便程序测试
>    4. 方便和其他框架进行整合
>    5. 方便进行事务操作



### Spring初体验

> 1. 使用`idea`新建`spring maven项目`
> 2. 新建`dao层接口类`
> 3. 新建`dao层接口实现类`
> 4. 在`pom`文件中`添加spring-context依赖`，**注意：**要先添加依赖，不然`无法创建`Spring的`applicationContext.xml配置文件`
> 5. 新建`applicationContext.xml配置文件`
> 6. 在`applicationContext.xml`配置文件中，`新建bean`
> 7. 使用spring容器提供的`bean对象`



`项目结构`

```
/                                           
├─ src                                      
│  ├─ main                                  
│  │  ├─ java                               
│  │  │  └─ com                             
│  │  │     └─ ginyi                        
│  │  │        └─ Dao                       # dao层接口类
│  │  │           ├─ Impl                   # dao层接口实现类
│  │  │           │  └─ UserDaoImpl.java    # dao层接口实现类测试代码
│  │  │           └─ UserDao.java           # dao接口类测试代码
│  │  └─ resources                          
│  │     └─ applicationContext.xml          # 配置文件
│  └─ test                                  
│     └─ java                               
│        └─ com                             
│           └─ ginyi                        
│              └─ Test                      
│                 └─ Test01.java            # 测试类
└─ pom.xml                                  # maven配置文件
```



`Dao接口类`

```java
package com.ginyi.Dao;

public interface UserDao {
    public void save();
}
```

`Dao接口实现类`

```java
package com.ginyi.Dao.Impl;

import com.ginyi.Dao.UserDao;

public class UserDaoImpl implements UserDao {

    @Override
    public void save() {
        System.out.println("UserDao running...");
    }
}
```

`applicationContext.xml`Spring配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userDao" class="com.ginyi.Dao.Impl.UserDaoImpl"></bean>

</beans>
```

`pom.xml maven配置文件`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>SpringTest</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- 添加spring-context依赖 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.2.4.RELEASE</version>
        </dependency>
        
        <!-- 添加Junit测试依赖 -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.11</version>
        </dependency>
    </dependencies>

</project>
```

输出结果，如下：

```java
// 测试获取UserDao这个bean
@Test
public void getBean(){
    // 实例化spring容器
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    // 获取UserDao这个bean
    UserDao userDao = (UserDao) app.getBean("userDao");
    userDao.save();
}
```

```
UserDao running...
```



### Spring开发步骤

> 1. 导入`Spring开发基本包`的坐标 --> 导入maven依赖
> 2. 编写`Dao接口`和`实现类` --> 创建`Bean`
> 3. 创建`Spring核心配置文件` --> 创建`applicationContext.xml`
> 4. 在spring配置文件中`配置UserDaoImpl` --> 在配置文件中进行配置
> 5. 使用Spring的`API`获得`Bean实例` --> 创建`ApplicationContext`对象`getBean`



### Bean

#### Bean标签基本配置

> 用于配置对象交由spring来创建。默认情况下它调用的是类中的无参构造函数，如果没有无参构造函数则不能创建成功。



Bean的基本属性

- `id`：Bean实例在容器中的唯一标识
- `class`：Bean的全限定名称(反射默认无参构造创建)
- `scope`：指对象的作用范围，取值如下：

| 取值范围       | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| **singleton**  | 默认值，单例的                                               |
| **prototype**  | 多例的                                                       |
| request        | web项目中，spring创建一个bean对象，将对象存入到`request域`中 |
| session        | web项目中，spring创建一个bean对象，将对象存入到`session域`中 |
| global session | web项目中，`应用在portlet环境中`，`如果没有portlet环境那么globalsession相当于session` |

当scope的取值为 **singleton** 时：

bean的实例化个数：1个

bean的实例化时机：当`spring核心文件被加载时`，`bean被实例化`。



> bean的`生命周期`：
>
> - 对象创建：当应用加载，创建容器时，对象就被创建了
> - 对象运行：只要容器在，对象一直活着
> - 对象销毁：当应用卸载，销毁容器时，对象就被销毁了



代码实现

`applicationContext.xml`，指定`scope`的属性值为`singleton`

```xml
<bean id="userDao" class="com.ginyi.Dao.Impl.UserDaoImpl" scope="singleton"></bean>
```

`TestUserDaoSingleton测试类`

```java
// 测试scope属性为singleton
@Test
public void TestUserDaoSingleton(){
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    // 获取容器当中的bean对象
    UserDao userDao1 = (UserDao) app.getBean("userDao");
    UserDao userDao2 = (UserDao) app.getBean("userDao");

    // 测试对象的hashcode是否一致, 一样的话, 表示获取的时同一bean对象
    System.out.println(userDao1.hashCode());
    System.out.println(userDao2.hashCode());
}
```

输出结果

```
395629617
395629617
```



当scope的取值为 **prototype** 时：

bean的实例化个数：多个

bean的实例化时机：当`调用getBean()方法时`，`bean被实例化`。

> bean的`生命周期`：
>
> - 对象创建：当使用对象时，创建新的对象实例
> - 对象运行：只要对象在使用中，对象一直活着
> - 对象销毁：当长时间不使用时，会被Java垃圾回收器回收



代码实现

`applicationContext.xml`，指定`scope`的属性值为`prototype`

```xml
<bean id="userDao" class="com.ginyi.Dao.Impl.UserDaoImpl" scope="prototype"></bean>
```

`TestUserDaoPrototype测试类`

```java
// 测试scope属性为prototype
@Test
public void TestUserDaoPrototype(){
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    // 获取容器当中的bean对象
    UserDao userDao1 = (UserDao) app.getBean("userDao");
    UserDao userDao2 = (UserDao) app.getBean("userDao");

    // 测试对象的hashcode是否一致, 一样的话, 表示获取的时同一bean对象
    System.out.println(userDao1.hashCode());
    System.out.println(userDao2.hashCode());
}
```

输出结果

```
1750905143
1782704802
```





#### Bean实例化的三种方式

- 无参构造方法实例化

```xml
<!-- 无参构造 -->
<bean id="userDao" class="com.ginyi.Dao.Impl.UserDaoImpl"></bean>
```

- 静态工厂方法实例化

新建静态工厂方法，返回接口实现类

```java
package com.ginyi.Factory;

import com.ginyi.Dao.Impl.UserDaoImpl;

public class StaticFactory {
    public static UserDaoImpl getUserDaoIml() {
        return new UserDaoImpl();
    }
}
```

编写bean

要把定义好的`静态工厂方法`，赋值给`factory-method`，class是指定静态工厂类

```xml
<!-- 静态工厂 -->
<bean id="userDao" class="com.ginyi.Factory.StaticFactory" factory-method="getUserDaoImpl"></bean>
```

- 工厂实例方法实例化

新建工厂方法，返回接口实现类

```java
package com.ginyi.Factory;

import com.ginyi.Dao.Impl.UserDaoImpl;
import com.ginyi.Dao.UserDao;

public class DynamicFactory {
    public UserDao getUserDao() {
        return new UserDaoImpl();
    }
}
```

编写bean

`factory-bean`是`第一个bean`的`id`

```xml
<!-- 工厂实例 -->
<bean id="factory" class="com.ginyi.Factory.DynamicFactory"/>
<bean id="userDao" factory-bean="factory" factory-method="getUserDao"/>
```

```java
// 测试工厂实例方法
@Test
public void TestDynamicFactory(){
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserDao userDao = (UserDao) app.getBean("userDao");
    userDao.save();
}
```

```
UserDao running...
```



### 依赖注入(DI)

> **Dependency Injecttion** 是spring框架核心`控制反转IOC`的具体实现。

> 在编写程序时，通过控制反转，把对象的创建交给了spring，但是代码中不可能出现没有依赖的情况。`IOC`解耦只是降低他们的依赖关系，但是不会消除。例如：业务层仍会调用持久层的方法。
>
> 那种业务层和持久层的依赖关系，在使用spring之后，就让spring来维护了。
>
> 简单说，就是坐等框架把持久层对象传入业务层，而不需要我们自己去获取。



service层的接口实现类，调用dao层，形成耦合

```java
public class UserServiceImpl implements UserService {
    @Override
    public void save() {
        // service调用dao, 代码耦合
        ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserDao  userDao = (UserDao) app.getBean("userDao");
        userDao.save();

        System.out.println("UserService running...");
    }
}
```

`applicationContext.xml`，编写service实现类的bean

```xml
<bean id="userService" class="com.ginyi.Service.Impl.UserServiceImpl"></bean>
```

测试效果

```java
// 测试service层调用dao层
@Test
public void TestServiceGetDao(){
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserService userService = (UserService) app.getBean("userService");
    userService.save();

}
```

上述代码，耦合性高：service实现类依赖了dao的bean。





#### set方法

> 通过set方法，将bean注入到属性

声明属性，提供set方法，用于被注入bean

```java
private UserDao userDao;

public void setUserDao(UserDao userDao) {
    this.userDao = userDao;
}
```

编写配置文件，注入bean

**注意：**`property`中的`name`是`setUserDao`中的`userDao(小写)`，`ref`是`引用属性`，即引用的bean实例对象(`bean的id`)

```xml
<bean id="userDaoBean" class="com.ginyi.Dao.Impl.UserDaoImpl"></bean>
<bean id="userService" class="com.ginyi.Service.Impl.UserServiceImpl">
    <property name="userDao" ref="userDaoBean" />
</bean>
```

编写测试

```java
@Test
public void TestSetBeanToProperty(){
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserService userService = (UserService) app.getBean("userService");
    userService.save();
}
```





#### 构造方法

> 通过有参构造方法，注入bean

提供有参构造方法，用于注入bean

```java
private UserDao userDao;

// 有参构造
public UserServiceImpl(UserDao userDao) {
    this.userDao = userDao;
}
```

编写配置文件

**注意：**`constructor-arg`中的`name`是`构造方法`中的`userDao(参数名)`，`ref`是`引用属性`，即引用的bean实例对象(`bean的id`)

```xml
<bean id="userDaoBean" class="com.ginyi.Dao.Impl.UserDaoImpl"></bean>
<bean id="userService" class="com.ginyi.Service.Impl.UserServiceImpl">
    <constructor-arg name="userDao" ref="userDaoBean" />
</bean>
```

编写测试

```java
// 测试有参构造注入beam
@Test
public void TestConstructor(){
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserService userService = (UserService) app.getBean("userService");
    userService.save();
}
```



#### Bean注入普通的数据类型

> 上面的操作，都是注入的引用bean，除了对象的引用可以注入，普通数据类型，集合等都可以在容器中进行注入
>
> 注入数据的三种数据类型
>
> - 普通数据类型
> - 引用数据类型
> - 集合数据类型



- 普通属性的注入

声明属性，提供set方法，用于被注入属性值

```java
private String name;
private int age;

public void setName(String name) {
    this.name = name;
}

public void setAge(int age) {
    this.age = age;
}
```

编写配置文件

```xml
<bean id="userService" class="com.ginyi.Service.Impl.UserServiceImpl">
    <property name="age" value="20" />
    <property name="name" value="zhangsan" />
</bean>
```

编写测试

```java
// 测试普通属性的注入
@Test
public void TestSetNomalProperty(){
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserService userService = (UserService) app.getBean("userService");
    userService.save();
}
```

输出结果

```
zhangsan=====20
```

#### Bean注入引用的数据类型

声明属性，提供set方法，用于被注入属性值

```java
private List<String> strList;
private Map<String, User> userMap;

public void setStrList(List<String> strList) {
    this.strList = strList;
}

public void setUserMap(Map<String, User> userMap) {
    this.userMap = userMap;
}
```

user类如下

```java
package com.ginyi.Entity;

public class User {
    private String name;
    private int age;

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

}
```



编写配置文件

```xml

<bean id="userService" class="com.ginyi.Service.Impl.UserServiceImpl">
    <!-- 注入列表集合的属性值 -->
    <property name="strList">
        <list>
            <value>hello</value>
            <value>world</value>
        </list>
    </property>
    <property name="userMap">
        <map>
            <!-- value-ref引用的是下方的bean -->
            <entry key="u1" value-ref="user1"></entry>
            <entry key="u2" value-ref="user2"></entry>
        </map>
    </property>
</bean>

<bean id="user1" class="com.ginyi.Entity.User">
<property name="name" value="张三"/>
<property name="age" value="18"/>
</bean>
<bean id="user2" class="com.ginyi.Entity.User">
<property name="name" value="李四"/>
<property name="age" value="18"/>
</bean>
```

编写测试

```java
// 测试引用属性的注入
@Test
public void TestSetRefProperty(){
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserService userService = (UserService) app.getBean("userService");
    userService.save();
}
```

输出结果

```
strList[hello, world]
userMap{u1=User{name='张三', age=18}, u2=User{name='李四', age=18}}
```







#### 引入配置文件

> 实际开发中，Spring的配置内容非常多，这就导致Spring配置很繁杂且体积很大，所以，可以将部分配置拆解到其他配置文件中，而在Spring主配置文件通过import标签进行加载

```xml
<import resource="applicationContext-xxx.xml" />
```

例如，上述`User`的`bean`可以将其抽离出到`applicationContext-user.xml`中，再到`主配置文件中导入`即可

`applicationContext-user.xml`

```xml

<bean id="user1" class="com.ginyi.Entity.User">
    <property name="name" value="张三"/>
    <property name="age" value="18"/>
</bean>
<bean id="user2" class="com.ginyi.Entity.User">
<property name="name" value="李四"/>
<property name="age" value="18"/>
</bean>
```

导入到主配置文件中

```xml
<bean id="userService" class="com.ginyi.Service.Impl.UserServiceImpl">
    <!-- 注入列表集合的属性值 -->
    <property name="strList">
        <list>
            <value>hello</value>
            <value>world</value>
        </list>
    </property>
    <property name="userMap">
        <map>
            <!-- value-ref引用的是下方的bean -->
            <entry key="u1" value-ref="user1"></entry>
            <entry key="u2" value-ref="user2"></entry>
        </map>
    </property>
</bean>
<!-- 导入user模块的配置文件 -->
<import resource="applicationContext-user.xml" />
```



### Spring配置数据源

> 数据源（连接池）的作用：
>
> - 数据源（连接池）是提高程序性能出现的
> - 事先实例化数据源，初始化部分连接资源
> - 使用连接资源时从数据源中获取
> - 使用完毕后将连接资源归还给数据源
>
> 常见的数据源（连接池）：`C3P0`  `Druid`等

>配置数据源（连接池）的步骤：
>
>1. 导入数据源的坐标和数据库驱动坐标
>2. 创建数据源对象
>3. 设置数据源的基本连接数据



添加`C3P0`  `Druid`依赖

```xml
<dependencies>
	...
    <!-- 导入MySQL -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.32</version>
    </dependency>

    <!-- 导入druid -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.1.10</version>
    </dependency>

    <!-- 导入c3p0 -->
    <dependency>
        <groupId>c3p0</groupId>
        <artifactId>c3p0</artifactId>
        <version>0.9.1.2</version>
    </dependency>
</dependencies>
```



#### 普通方式连接

> 耦合性高

编写测试，测试是否连接成功

```java
// 测试c3p0数据源的连接
@Test
public void TestC3p0DataSource() throws Exception {
    ComboPooledDataSource dataSource = new ComboPooledDataSource();
    dataSource.setDriverClass("com.mysql.jdbc.Driver");
    dataSource.setJdbcUrl("jdbc:mysql://127.0.0.1:3307/test");
    dataSource.setUser("root");
    dataSource.setPassword("123456");
    Connection connection = dataSource.getConnection();
    System.out.println("TestC3p0DataSource 打印出地址即连接成功 ---> " + connection);
    connection.close();
}

// 测试druid数据源的连接
@Test
public void TestDruid() throws Exception {
    DruidDataSource dataSource = new DruidDataSource();
    dataSource.setDriverClassName("com.mysql.jdbc.Driver");
    dataSource.setUrl("jdbc:mysql://127.0.0.1:3307/test");
    dataSource.setUsername("root");
    dataSource.setPassword("123456");
    DruidPooledConnection connection = dataSource.getConnection();
    System.out.println("TestDruid 打印出地址即连接成功 ---> " + connection);
    connection.close();
}
```

输出结果

```
C3p0 打印出地址即连接成功 ---> com.mchange.v2.c3p0.impl.NewProxyConnection@c818063
Druid 打印出地址即连接成功 ---> com.mysql.jdbc.JDBC4Connection@c39f790
```



#### properties配置文件

> 上述代码耦合性高，解耦可将上述数据源的配置信息，编写到`jdbc.properties`文件。
>
> **注意：**`jdbc.properties`文件位于`resource`目录下，读取时只需传`jdbc`即可，不需要`properties`后缀名

编写配置文件`jdbc.properties`

```properties
jdbc.Driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://127.0.0.1:3307/test
jdbc.username=root
jdbc.password=123456
```

编写测试

```java
// 测试通过properties读取jdbc配置信息
@Test
public void TestReadPropertiesGetInfo() throws Exception {
    // 读取配置信息
    ResourceBundle rb = ResourceBundle.getBundle("jdbc");
    String Driver = rb.getString("jdbc.Driver");
    String url = rb.getString("jdbc.url");
    String username = rb.getString("jdbc.username");
    String password = rb.getString("jdbc.password");

    ComboPooledDataSource dataSource = new ComboPooledDataSource();
    dataSource.setDriverClass(Driver);
    dataSource.setJdbcUrl(url);
    dataSource.setUser(username);
    dataSource.setPassword(password);
    Connection connection = dataSource.getConnection();
    System.out.println("测试通过properties读取jdbc配置信息 -->" + connection);
    connection.close();

}
```

输出结果

```
测试通过properties读取jdbc配置信息 -->com.mchange.v2.c3p0.impl.NewProxyConnection@3f0ee7cb
```





#### 使用Spring配置数据源

> 可以将`DataSource`的创建权交由Spring容器去完成
>
> - `DataSource`有无参构造方法，而Spring默认就是通过无参构造方法实例化对象的
> - `DataSource`要想使用需要通过set方法设置数据库连接信息，而Spring可以通过set进行字符串注入



编写bean

> **注意：**`property`的中`name`是`setXxx`中的`Xxx`，且要为`小写`！！如`driverClass`就写`driverClass`

```xml
<!-- c3p0的bean -->
<bean id="c3p0DataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="com.mysql.jdbc.Driver" />
    <property name="jdbcUrl" value="jdbc:mysql://127.0.0.1:3307/test" />
    <property name="user" value="root" />
    <property name="password" value="123456" />
</bean>

<!-- druid的bean -->
<bean id="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver" />
    <property name="url" value="jdbc:mysql://127.0.0.1:3307/test" />
    <property name="username" value="root" />
    <property name="password" value="123456" />
</bean>
```

编写测试

```java
// 使用spring配置(druid)数据源
@Test
public void TestSpringConfigInfo() throws SQLException {
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext-jdbc.xml");
    DruidDataSource druidDataSource = (DruidDataSource) app.getBean("druidDataSource");
    DruidPooledConnection connection = druidDataSource.getConnection();
    System.out.println("通过spring配置(druid)数据源 ---> " + connection);
    connection.close();
}

// 使用spring配置(c3p0)数据源
@Test
public void TestSpringConfigInfo2() throws SQLException {
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext-jdbc.xml");
    DataSource dataSource = (DataSource) app.getBean("c3p0DataSource");
    Connection connection = dataSource.getConnection();
    System.out.println("通过spring配置(c3p0)数据源 ---> " + connection);
    connection.close();

}
```

输出结果

```
通过spring配置(druid)数据源 ---> com.mysql.jdbc.JDBC4Connection@13acb0d1
通过spring配置(c3p0)数据源 ---> com.mchange.v2.c3p0.impl.NewProxyConnection@212bf671
```



#### 使用Spring加载properties配置文件

> 通常开发时，会将`jdbc中的配置信息`编写在`properties配置文件`中，再`由Spring容器加载该配置文件`，实现解耦。

Spring加载properties文件，首先，需要引入context命名空间和约束路径：

- 命名空间：`xmlns:context`="http://www.springframework.org/schema/context"


- 约束路径(在`xsi:schemaLocation`中)：http://www.springframework.org/schema/context  http://www.springframework.org/schema/context/spring-context.xsd

在beans标签上配置如上信息

代码如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 加载配置文件(位于resource下) -->
    <context:property-placeholder location="jdbc.properties" />
    
    
	<!-- 读取properties的属性值 -->
    <!-- c3p0的bean -->
    <bean id="c3p0DataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="${jdbc.Driver}" />
        <property name="jdbcUrl" value="${jdbc.url}" />
        <property name="user" value="${jdbc.username}" />
        <property name="password" value="${jdbc.password}" />
    </bean>

    <!-- druid的bean -->
    <bean id="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.Driver}" />
        <property name="url" value="${jdbc.url}" />
        <property name="username" value="${jdbc.username}" />
        <property name="password" value="${jdbc.password}" />
    </bean>
</beans>
```

其中`jdbc.properties`代码如下：

```properties
jdbc.Driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://127.0.0.1:3307/test
jdbc.username=root
jdbc.password=123456
```

编写测试

```java
// 使用spring加载properties文件配置(druid)数据源
@Test
public void TestSpringConfigInfoFromProperties() throws SQLException {
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext-jdbc.xml");
    DruidDataSource druidDataSource = (DruidDataSource) app.getBean("druidDataSource");
    DruidPooledConnection connection = druidDataSource.getConnection();
    System.out.println("通过spring加载properties文件配置(druid)数据源 ---> " + connection);
    connection.close();
}

// 使用spring加载properties文件配置(c3p0)数据源
@Test
public void TestSpringConfigInfo2FromProperties() throws SQLException {
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext-jdbc.xml");
    DataSource dataSource = (DataSource) app.getBean("c3p0DataSource");
    Connection connection = dataSource.getConnection();
    System.out.println("通过spring加载properties文件配置(c3p0)数据源 ---> " + connection);
    connection.close();
}
```

输出结果

```
通过spring加载properties文件配置(druid)数据源 ---> com.mysql.jdbc.JDBC4Connection@3d121db3
通过spring加载properties文件配置(c3p0)数据源 ---> com.mchange.v2.c3p0.impl.NewProxyConnection@290d210d
```



### Spring注解

#### 原始注解

> Spring原始注解，主要用于替代`<Bean>`的配置

| 注解             | 说明                                               |
| ---------------- | -------------------------------------------------- |
| `@Component`     | 使用在类上，用于实例化bean                         |
| `@Controller`    | 使用在`web层`类上，用于实例化bean                  |
| `@Service`       | 使用在`service层`类上，用于实例化bean              |
| `@Respository`   | 使用在`dao层`类上，用于实例化bean                  |
| `@Autowired`     | 使用在字段上，用于根据类型依赖注入                 |
| `@Qualifier`     | 结合`@Autowired`一起使用，用于根据名称进行依赖注入 |
| `@Resource`      | 相当于`@Autowired + @Qualifired`，按照名称进行注入 |
| `@Value`         | 注入普通属性                                       |
| `@Scope`         | 标注bean的作用范围                                 |
| `@PostConstruct` | 使用在方法上，标注该方法是`bean的初始化方法`       |
| `@PreDestroy`    | 使用在方法上，标注该方法是`bean的销毁方法`         |

> **注意：**使用注解进行开发时，需要在`applicationContext.xml`中配置组件扫描，作用是指定哪个包及其子包下的Bean，需要进行扫描以便识别使用注解配置的类、字段和方法

配置组件扫描

```xml
<!-- 扫描组件 -->
<context:component-scan base-package="com.ginyi" />
```



##### component

xml配置写法

```xml
<bean id="userDaoBean" class="com.ginyi.Dao.Impl.UserDaoImpl"></bean>
```

注解写法

**注意：**`Component`传入的字符串代表`bean的ID`

```java
@Component("userDaoBean")
public class UserDaoImpl implements UserDao {

    @Override
    public void save() {
        System.out.println("UserDao running...");
    }
}
```

编写测试

```java
// 测试dao层组件注解
@Test
public void TestDaoComponent(){
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserDao userDaoBean = (UserDao) app.getBean("userDaoBean");
    userDaoBean.save();
}
```



##### Autowired + Qualifier

> 注入bean

xml配置写法

**注意：**property中的name属性是set方法中的参数名

```xml
<bean id="userDaoBean" class="com.ginyi.Dao.Impl.UserDaoImpl"></bean>
<bean id="userService" class="com.ginyi.Service.Impl.UserServiceImpl">
	<property name="userDao" ref="userDaoBean"/>
</bean>
```

```java
// 需要提供set方法
public class UserServiceImpl implements UserService {

    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public void save() {
        userDao.save();
    }
}
```

注解写法

**注意：**`Qualifier`传入的字符串代表`bean的ID`

**注意：**`@Qualifier`可以省略，`@Autowired`会`自动匹配类型`然后自动注入，但`如果使用@Qualifier的话，必须搭配@Autowired`！

```java
@Component("userService")
public class UserServiceImpl implements UserService {

    @Autowired  // 按照类型自动注入
    @Qualifier("userDaoBean")  // 按照bean的id进行注入，必须搭配Autowired一起使用
    private UserDao userDao;

    @Override
    public void save() {
        userDao.save();
    }
}
```

编写测试

```java
// 测试service层组件注解
@Test
public void TestServcieComponenet(){
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserService userService = (UserService) app.getBean("userService");
    userService.save();
}
```



##### Service + Respository

> 这两个注解作用跟`component`一样，都是注册为组件Bean，但是，它俩具有语义化，`Service表示是service层`，`Respository表示是dao层。`

```java
@Repository("userDaoBean")
public class UserDaoImpl implements UserDao {

    @Override
    public void save() {
        System.out.println("UserDao running...");
    }
}
```

```java
@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public void save() {
        userDao.save();
    }
}
```



##### Resource

> 相当于`@Autowired + @Qualifired`，按照名称进行注入

```java
// 以下写法等同
@Autowired
@Qualifier("userDaoBean" )
private UserDao userDao1;

@Resource(name = "userDaoBean" )
private UserDao userDao2;
```



##### Value

> 给普通属性注入值

```java
// 写死某个字符串
@Value("hello world")
private String driver;

// 读取配置文件, 前提是容器中必须要对应的配置文件存在
@Value("${jdbc.Driver}")
private String driver;

```

```
hello world
com.mysql.jdbc.Driver
```



##### Scope

> 标注bean的作用范围：单例还是多例

```xml
<bean id="userDao" class="com.ginyi.Dao.Impl.UserDaoImpl" scope="singleton"></bean>
```

```java
@Repository("userDaoBean")
@Scope("singleton")
public class UserDaoImpl implements UserDao {

    @Override
    public void save() {
        System.out.println("UserDao running...");
    }
}
```



##### PostConstruct + PreDestroy

> bean实例化时执行和销毁时执行

```java
@Service("userService")
public class UserServiceImpl implements UserService {

    @PostConstruct
    public void init(){
        System.out.println("bean初始化时执行！");
    }

    @PreDestroy
    public void destroy(){
        System.out.println("bean销毁时执行！");
    }
}
```

编写测试

```java
// 测试bean的初始化方法和销毁方法
@Test
public void TestInitAndDestroy(){
    ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    app.close();
}
```

输出结果

```
bean初始化时执行！
七月 07, 2022 2:45:56 下午 com.mchange.v2.log.MLog <clinit>
信息: MLog clients using java 1.4+ standard logging.
七月 07, 2022 2:45:56 下午 com.mchange.v2.c3p0.C3P0Registry banner
信息: Initializing c3p0-0.9.1.2 [built 21-May-2007 15:04:56; debug? true; trace: 10]
bean销毁时执行！
```

#### 新注解

> 用于解决原始注解替代不了的问题，如导入配置文件、扫描组件等等

| 注解              | 说明                                                         |
| ----------------- | ------------------------------------------------------------ |
| `@Configuration`  | 用于指定当前类是一个spring配置类，当创建容器时会从该类上加载注解 |
| `@Bean`           | 使用在方法上，标注将该方法的返回值存储到spring容器中，`可以指定bean的ID` |
| `@PropertySource` | 用于加载`.properties`文件中的配置                            |
| `@Import`         | 用于导入其他配置类，传入字节码class文件                      |
| `@ComponentScan`  | 用于指定spring在初始化容器时要扫描的包                       |

新建`config包`和`SpringConfigration`核心配置类

```java
package com.ginyi.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

// 标志位Spring核心配置类
@Configuration
// 扫描指定包组件，注册为bean
@ComponentScan("com.ginyi")
// 导入其他配置类
@Import(DataSourceConfig.class)
public class SpringConfigration {


}

```

新建`DataSource`数据库配置类

```java
package com.ginyi.config;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;

// 读取properties配置文件
@PropertySource("classpath:jdbc.properties")
public class DataSourceConfig {

    @Value("${jdbc.Driver}")
    private String driver;

    @Value("${jdbc.url}")
    private String url;

    @Value("${jdbc.username}")
    private String username;

    @Value("${jdbc.password}")
    private String password;

    // 将方法的返回值注册为bean
    @Bean("dataSource")
    public DataSource getDataSource() throws PropertyVetoException {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setDriverClass(driver);
        dataSource.setJdbcUrl(url);
        dataSource.setUser(username);
        dataSource.setPassword(password);
        return dataSource;
    }
}
```

编写测试

```java
// 测试新注解
@Test
public void TestNewAnno() throws SQLException {
    // 参数传的是核心配置类的字节码文件
    AnnotationConfigApplicationContext app = new AnnotationConfigApplicationContext(SpringConfigration.class);

    UserService userService = (UserService) app.getBean("userService");
    userService.save();
    
    // 测试获取数据库是否成功注入为Bean
    DataSource dataSource = (DataSource) app.getBean("dataSource");
    Connection connection = dataSource.getConnection();
    System.out.println(connection);
}
```

```bash
`bean初始化时执行！`
七月 07, 2022 3:51:06 下午 com.mchange.v2.log.MLog <clinit>
信息: MLog clients using java 1.4+ standard logging.
七月 07, 2022 3:51:06 下午 com.mchange.v2.c3p0.C3P0Registry banner
信息: Initializing c3p0-0.9.1.2 [built 21-May-2007 15:04:56; debug? true; trace: 10]
`com.mysql.jdbc.Driver`
`UserDao running...	`
七月 07, 2022 3:51:06 下午 com.mchange.v2.c3p0.impl.AbstractPoolBackedDataSource getPoolManager
信息: Initializing c3p0 pool... com.mchange.v2.c3p0....
`com.mchange.v2.c3p0.impl.NewProxyConnection@54d9d12d`
`bean销毁时执行`
```





### Spring集成Junit

> 原始`@Test`会存在冗余问题，每个测试类都需要`new ClassPathXmlApplicationContext("xxx.xml");且getBean()`，如果不写的话，直接会提示空指针异常。所以又不能轻易删掉。

> 解决思路：
>
> - 让SpringJunit负责创建Spring容器，但是需要将配置文件的名称告诉它。
> - 将需要进行测试Bean直接在测试类中进行注入。

> 集成步骤
>
> 1. 导入Spring集成Junit的坐标
> 2. 使用`@Runwith`注解替换原来的运行期
> 3. 使用`@ContextConfiguration`指定配置文件或配置类
> 4. 使用`@Autowired`注入需要测试的对象
> 5. 创建测试方法进行测试
>
> **注意：**`spring5`及以上版本要求` junit `的版本必须是` 4.12 `及以上



导入坐标

```xml
<!-- 添加Junit测试依赖 -->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>
<!-- 导入Spring-Test -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.2.4.RELEASE</version>
</dependency>
```

编写测试

```java
// 替换原来的运行期
@RunWith(SpringJUnit4ClassRunner.class)
// Spring核心配置文件
@ContextConfiguration("classpath:applicationContext.xml")
// Spring核心配置类
@ContextConfiguration(classes = {SpringConfiguration.class})
public class SpringJunitTest {

    @Autowired
    private UserService userService;

    @Autowired
    private DataSource dataSource;

    @Test
    public void Test01() throws SQLException {
        userService.save();
        System.out.println(dataSource.getConnection());
    }

}
```



### Spring集成Web

> 集成web是为了`SpringMVC`做准备
>
> 集成步骤：
>
> 1. 准备好Tomcat服务器
> 2. 创建好maven web项目
> 3. 导入servlet坐标
> 4. 配置Tomcat环境
> 5. 编写web类，配置web.xml
> 6. 启动项目
>
> 1. 



#### 创建项目

第一步

打开`Apache`官网，下载`Tomacat`，官网地址：https://tomcat.apache.org/



第二步

新建项目，选择`maven`，选择`maven`下的`org.apache.maven.archetypes:maven-archetype-webapp`，按提示往下执行创建即可



第三步

```xml
<!-- 集成servlet必备依赖 -->
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.0.1</version>
    <scope>provided</scope>
</dependency>
<dependency>
    <groupId>javax.servlet.jsp</groupId>
    <artifactId>javax.servlet.jsp-api</artifactId>
    <version>2.2.1</version>
    <scope>provided</scope>
</dependency>



<!-- 导入其他依赖 -->
<!-- 添加spring-context依赖 -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.2.4.RELEASE</version>
</dependency>

<!-- 添加Junit测试依赖 -->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>

<!-- 导入MySQL -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.32</version>
</dependency>

<!-- 导入druid -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.10</version>
</dependency>

<!-- 导入c3p0 -->
<dependency>
    <groupId>c3p0</groupId>
    <artifactId>c3p0</artifactId>
    <version>0.9.1.2</version>
</dependency>

<!-- 导入Spring-Test -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.2.4.RELEASE</version>
</dependency>
```

第四步

配置tomcat运行环境，直接在idea中进行配置即可

编辑配置 --> 添加配置 --> 选择Tomcat服务器 --> 本地 --> 配置Tomcat所在目录 --> 配置JRE所在目录 --> 指定端口号(8080) --> 完成





第五步

编写web类

```java
package com.ginyi.Web;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class UserServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("servlet running...");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}

```

配置web.xml

```xml

<web-app>
    <display-name>Archetype Created Web Application</display-name>

    <!-- 指定web类，配置路径映射 -->
    <servlet>
        <servlet-name>UserServlet</servlet-name>
        <servlet-class>com.ginyi.Web.UserServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>UserServlet</servlet-name>
        <url-pattern>/user</url-pattern>
    </servlet-mapping>
</web-app>
```

第六步

启动项目，访问http://localhost:8080/user，观察控制台。





#### 配置监听器

> 当web项目被集成到Spring时，每次访问web类，都需要创建spring的上下文对象，造成性能消耗资源浪费，如下所示

```java
public class UserServlet1 extends HttpServlet {

    // 注意看这个方法的方法体
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserService userService = (UserService) app.getBean("userService");
        userService.save();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}

public class UserServlet12 extends HttpServlet {

    // 注意看这个方法的方法体
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserService userService = (UserService) app.getBean("userService");
        userService.save();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
```



解决的办法就是，`将Spring的上下文对象，存储到web项目的servletContext的作用域当中`，使其应用到整个项目，即项目内可全局访问。

> 配置监听器步骤：
>
> 1. 创建监听器类，项目启动时，获取`Spring的上下文对象`，并存储在`servletContext作用域`中
> 2. 配置`web.xml`，指定该监听器
> 3. 获取存储在`servletContext`中的Spring的上下文对象

创建监听器类`ContextLoaderListener`

```java
package com.ginyi.Listener;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class ContextLoaderListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        // 获取Spring的上下文对象
        ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        // 将Spring的上下文对象存储到ServletContext域中
        ServletContext servletContext = servletContextEvent.getServletContext();
        servletContext.setAttribute("app", app);
        System.out.println("已将Spring的上下文对象作用域提升至ServletContext域中~~~");
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
```

```xml

<web-app>
    <display-name>Archetype Created Web Application</display-name>

    <!-- 配置监听器 -->
    <listener>
        <listener-class>com.ginyi.Listener.ContextLoaderListener</listener-class>
    </listener>

    <!-- 指定web类，配置路径映射 -->
    <servlet>
        <servlet-name>UserServlet</servlet-name>
        <servlet-class>com.ginyi.Web.UserServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>UserServlet</servlet-name>
        <url-pattern>/user</url-pattern>
    </servlet-mapping>
</web-app>
```

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 获取当前项目的上下文对象，即ServletContext
    ServletContext servletContext = this.getServletContext();
    // 获取存储在ServletContext中的Spring的上下文对象
    ApplicationContext app = (ApplicationContext) servletContext.getAttribute("app");
    UserService userService = (UserService) app.getBean("userService");
    userService.save();
}
```

启动服务器，访问 http://localhost:8088/user 观察控制台

```bash
`已连接到服务器`
`[2022-07-07 10:21:59,110] 工件 SpringMvcTest:war: 正在部署工件，请稍候…`
07-Jul-2022 22:22:00.724 信息 [RMI TCP Connection(5)-127.0.0.1] org.apache.jasper.servlet.TldScanner.scanJars 至少有一个JAR被扫描用于TLD但尚未包含TLD。 为此记录器启用调试日志记录，以获取已扫描但未在其中找到TLD的完整JAR列表。 在扫描期间跳过不需要的JAR可以缩短启动时间和JSP编译时间。
`已将Spring的上下文对象作用域提升至ServletContext域中~~~`
`[2022-07-07 10:22:01,020] 工件 SpringMvcTest:war: 工件已成功部署`
`[2022-07-07 10:22:01,021] 工件 SpringMvcTest:war: 部署已花费 1,910 毫秒`
`UserDao running...`
```





## **SpringMVC**

> `Spring MVC`是一个基于Java的实现了`MVC设计模式的`请求驱动类型的`轻量级Web框架`，通过`把Model，View，Controller分离`，将web层进行职责解耦，把复杂的web应用分成逻辑清晰的几部分，简化开发，减少出错，方便组内开发人员之间的配合。
>
> 在Web应用程序设计中，`MVC模式`已经被广泛使用。`SpringMVC`以`DispatcherServlet`为核心，负责协调和组织不同组件以完成请求处理并返回响应的工作，实现了`MVC模式`。



> SpringMVC开发步骤：
>
> 1. 导入`SpringMVC相关坐标`
> 2. 配置`SpringMVC核心控制器DispathcerServlet`
> 3. 创建Controller类和视图页面
> 4. 使用注解`配置Controller类中业务方法的映射地址`
> 5. 配置`SpringMVC核心文件spring-mvc.xml`
> 6. 客户端发起请求测试



### SpringMVC快速入门

导入`SpringMVC`坐标

**注意：**版本号要与Spring-context保持一致

```xml
<!-- 添加spring-context依赖 -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.2.4.RELEASE</version>
</dependency>

<!-- 集成SpringMVC -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.2.4.RELEASE</version>
</dependency>
```



配置SpringMVC核心控制器DispathcerServlet

新建`spring-mvc.xml`，进行Controller组件的包扫描

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">


    <!-- 扫描controller包 -->
    <context:component-scan base-package="com.ginyi.Controller"/>
</beans>
```

在`web.xml`中配置

```xml
<!-- 配置SpringMVC的前端控制器 -->
<servlet>
    <servlet-name>DispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!-- 配置完SpringMVC.xml后要在这次配置一下 -->
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:spring-mvc.xml</param-value>
    </init-param>
    <!-- 项目启动就加载 -->
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>DispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

创建Controller类和视图页面

src下新建controller包，专门管理controoler类

```java
package com.ginyi.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {

    @RequestMapping("/hello")
    public String save() {
        return "/views/hello.jsp";
    }
}
```

webapp下新建views包，专门管理页面视图文件

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <h1>已经进入Controller...</h1>
</body>
</html>
```

启动项目，访问http://localhost:8088/hello





### SpringMVC流程图

![20210225151030274179](https://gitee.com/my-images/typora-imgs/raw/master/20210225151030274179.png)





### SpringMVC执行流程

> 1. 用户发起请求至`前端控制器DispatcherServlet`
> 2. `DispatcherServlet`收到请求`调用HandlerMapping处理器`
> 3. 处理器映射器找到具体的处理器（可以根据`xml`配置、注解进行查找），生成处理器对象处理拦截器（如果有则生成）一并`返回给DispatcherServlet`
> 4. `DispatcherServlet`调用`HandlerAdapter处理器适配器`
> 5. `HandlerAdapter`经过适配`调用具体的处理器`（Controller，也叫后端控制器）
> 6. `Controller`执行完成后`返回ModelAndView`
> 7. `HandlerAdapter`将Controller执行结果`ModelAndView返回给DispatcherServlet`
> 8. `DispatcherServlet`将`ModelAndView`传给`ViewResolver视图解析器`
> 9. `ViewResolver`解析后`返回具体的view`
> 10. `DispatcherServlet`根据view进行渲染视图（即将模型数据填充至视图中），最后`由DispatcherServlet响应给用户`。



![20191111001353245127](https://gitee.com/my-images/typora-imgs/raw/master/20191111001353245127.jpg)





### SpringMVC注解

`@Controller`

> 使用在类上，注册为Web层的JavaBean



`@RequestMapping`

使用

使用在类或方法上，分两种情况，示例如下：

```java
// 使用在类上，代表某个模块
// 访问时 http://localhost:8088/user/hello
@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/hello")
    public String save(){
        return "/views/hello.jsp";
    }
}
```

```java
// 使用在方法上
// 访问时 http://localhost:8088/hello
@Controller
public class UserController {

    @RequestMapping("/hello")
    public String save(){
        return "/views/hello.jsp";
    }
}

```

参数

| 参数名   | 作用                                                |
| -------- | --------------------------------------------------- |
| `value`  | 指定访问路径                                        |
| `method` | 指定请求类型，使用枚举类表示，如`RequestMethod.GET` |
| `params` | 请求参数                                            |

```JAVA
@Controller
public class UserController {

    @RequestMapping(value = "/hello", method = {RequestMethod.GET, RequestMethod.POST}, params = {"username", "password"})
    public String save(){
        return "/views/hello.jsp";
    }
}
```



### SpringMVC数据响应

> 数据响应分两种：
>
> 1. 页面跳转
>    1. 直接返回字符串
>    2. 通过ModelAndView
> 2. 回写数据（前后端交互常用）
>    1. 直接返回字符串
>    2. 返回对象或集合



#### 页面跳转

##### 直接返回字符串

>  返回的字符串与视图解析器的前后缀拼接后跳转，也`可直接指定文件所在路径(推荐)`。实例如下：

存在视图文件：`webapp/views/hello.jsp`

```java
@Controller
public class UserController {

    @RequestMapping("/hello")
    public String save(){
        return "/views/hello.jsp";
    }
}
```



##### 通过ModelAndView

关键代码，实例化ModelAndView对象，如

```java
/**
 * model: 作用是封装数据
 * view: 作用展示数据
 */
ModelAndView modelAndView = new ModelAndView();
modelAndView.addObject("username", "小马");   // 传递参数给视图文件
modelAndView.setViewName("hello");  // 同样返回视图hello.jsp
```

```java
@RequestMapping("/model_and_view")
public ModelAndView model_and_view(){
    /**
     * model: 作用是封装数据
     * view: 作用展示数据
     */
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.addObject("username", "小马");   // 传递参数给视图文件
    modelAndView.setViewName("hello");  // 同样返回视图hello.jsp
    return modelAndView;
}
```

hello.jsp代码如下

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <h1>username: ${username}</h1>
</body>
</html>
```





#### 回写数据

> 前后端数据交互，返回`Json`，开发常用。

返回文本数据，需要在方法上加`@ResponseBody`注解，`表示返回的是文本数据而不是页面`

如果返回乱码，记得在`@ResponseBody`中加`produces="text/html;charset=UTF-8"`

```java
@RequestMapping(value = "/get_text_data", produces="text/html;charset=UTF-8")
@ResponseBody
public String get_text(){
    return "hello world, 这是一段文本数据";
}
```

```java
@RequestMapping(value = "/get_object_data", produces="text/html;charset=UTF-8")
@ResponseBody
public String get_object(){
    User user = new User();
    user.setAge(20);
    user.setName("zhangsan");
    // 使用alibaba的fastjson2工具进行序列化
    return JSON.toJSONString(user);
}
```



### SpringMVC请求参数

> 请求数据的类型：
>
> - 基本类型参数
> - POJO类型参数
> - 数组类型参数
> - 集合类型参数



乱码问题的解决方法







#### 基本类型参数

**注意：**此处的`age`接收是`int`类型，但实际浏览器传参过程中，是`String`类型的，只不过是`框架帮忙做了转换`。

```java
@ResponseBody
@RequestMapping("/basic_params")
public void basic_params(String username, int age){
    System.out.println(username + " -- " + age);
}
```

发起请求：http://127.0.0.1:8088/basic_params?username=zhangsan&age=18





#### POJO类型参数

> `Controller`中的业务方法的`POJO`参数的`属性名与请求参数的名字`保持一致，参数值会`自动映射匹配`。

User类

```java
public class User {
    private String name;
    private int age;

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

}
```



```java
@ResponseBody
@RequestMapping("/pojo_params")
public void basic_params(User user){
    System.out.println(user.getName() + " -- " + user.getAge());
}
```

发起请求：http://127.0.0.1:8088/pojo_params?name=zhangsan&age=20



#### 数据类型参数

> Controller中的业务方法数组名称与请求参数的名字一致，参数值会被自动映射匹配。

```java
@ResponseBody
@RequestMapping("/array_params")
public void array_params(String[] hobby){
    System.out.println(Arrays.asList(hobby));
}
```

发起请求：http://127.0.0.1:8088/array_params?hobby=ball&hobby=eat





#### @RequestParam

> 注解@RequestParam还有如下参数可以使用：
>
> - `value`：与请求参数名称一致
> - `required`：此在指定的请求参数是否必须包括，`默认true`，提交时如果没有此参数则报错
> - `defaultValue`：当没有指定请求参数时，则使用指定的默认值赋值

```java
@ResponseBody
@RequestMapping(value = "/request_params_use_anno")
public void request_params_use_anno(@RequestParam(value = "user", required = false, defaultValue = "zhangsan") String username){
    System.out.println(username);
}
```

发起请求：http://127.0.0.1:8088/request_params_use_anno?user=lisi，可以不传参，默认`zhangsan`





#### @PathVariable

> 表示使用`占位符`进行参数绑定，例如`/user/1`可以写成`/user/{id}`，占位符`{id}`对应的就是`1`的值

```java
@ResponseBody
@RequestMapping(value = "/request_params_use_anno/{id}")
public void request_params_use_anno2(@PathVariable(value = "id", required = true) String id){
    System.out.println(id);
}
```

发起请求：http://127.0.0.1:8088/request_params_use_anno/10





#### 自定义类型转换

> - SpringMVC默认已经提供了一些常用的类型转换器，例如客户端提交的字符串转换成int类型进行参数设置
> - 但是不是所有的数据类型都提供了转换器，没有提供就需要自定义转换器，例如：日期类型的数据就需要自定义转换器

> 自定义转换器的开发步骤：
>
> 1. 定义转换器类实现Convert接口
> 2. 在配置文件中声明转换器
> 3. 在`<annotation-driven>`中引用转换器

```java
@ResponseBody
@RequestMapping(value = "/date")
public void request_params_use_anno2(Date date){
    System.out.println(date);
}
```

发起请求：http://127.0.0.1:8088/date?date=`2022/05/05` 请求成功

发起请求：http://127.0.0.1:8088/date?date=`2022-05-05` 请求失败





定义转换器类实现Convert接口

```java
package com.ginyi.Convert;

import org.springframework.core.convert.converter.Converter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateConvert implements Converter<String, Date> {
    @Override
    public Date convert(String s) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = format.parse(s);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
}
```

在配置文件`Spring-mvc.xml`中声明转换器

```xml
<!-- 配置自定义日期转换器 -->
<bean id="conversionService" class="org.springframework.context.support.ConversionServiceFactoryBean">
    <property name="converters">
        <list>
            <bean class="com.ginyi.Convert.DateConvert"></bean>
        </list>
    </property>
</bean>
```

在配置文件`Spring-mvc.xml`中的`<annotation-driven>`引用转换器

```xml
!-- 配置注解驱动 -->
<mvc:annotation-driven conversion-service="conversionService"/>
```

发起请求：http://127.0.0.1:8088/date?date=`2022/05/05` 请求成功

发起请求：http://127.0.0.1:8088/date?date=`2022-05-05` 请求成功





#### Servlet相关API

> SpringMVC支持使用原始ServletAPI对象作为控制器方法的参数进行注入，常用的对象如下：
>
> - `HttpServletRequest`
> - `HttpServletResponse`
> - `HttpSession`

代码示例如下

```java
@ResponseBody
@RequestMapping(value = "/servlet_api")
public void servlet_api(HttpServletRequest request, HttpServletResponse response, HttpSession session){
    System.out.println(request);
    System.out.println(response);
    System.out.println(session);
}
```

```java
@ResponseBody
@RequestMapping(value = "/servlet_api")
public void servlet_api(HttpServletRequest request, HttpServletResponse response, HttpSession session){
    System.out.println(request);
    System.out.println(response);
    System.out.println(session);
}
```

发起请求：http://127.0.0.1:8088/servlet_api

```
org.apache.catalina.connector.RequestFacade@f9ef0fb
org.apache.catalina.connector.ResponseFacade@156fe0e1
org.apache.catalina.session.StandardSessionFacade@5b34f1f6
```



#### 获取请求头

##### @RequestHeader

> 使用`@RequestHeader`可以获得请求头信息，相当于`javaweb`的`request.getHeader(name)`，`@RequestHeader注解`的属性如下：
>
> - `value`：请求头的名称
> - `require`：是否必须携带此请求头

```java
@ResponseBody
@RequestMapping(value = "/use_request_header")
public void use_request_header(@RequestHeader(value = "User-Agent", required = false) String user_agent){
    System.out.println(user_agent);
}
```

发起请求：http://127.0.0.1:8088/use_request_header



##### @CookieValue

> 使用`@CookieValue`可以获得指定Cookie的值，`@CookieValue注解`的属性如下：
>
> - `value`：指定cookie的名称
> - `require`：是否必须携带此cookie

```java
@ResponseBody
@RequestMapping(value = "/use_request_header_cookie")
public void use_request_header_cookie(@CookieValue(value = "JSESSIONID", required = false) String jsessionid){
    System.out.println(jsessionid);
}
```

发起请求：http://127.0.0.1:8088/use_request_header_cookie





#### 文件上传

> 文件上传客户端三要素：
>
> - 表单项`type="file"`
> - 表单的提交方式是`post`请求
> - 表单的`enctype`属性是`多部份表单`形式以及`enctype="multipart/form-data"`

> 文件上传原理：
>
> - 当`form`表单修改为`多部分表单`时，`request.getParameter()`将失效
> - `enctype="application/x-www-form-urlencoded"`时，form表单的正文内容格式是：`key=value&key=value&key=value`
> - 当form表单的`enctype`取值为`Mutilpart/form-data`时，请求正文内容就变成`多部份`形式

> 单文件上传步骤：
>
> 1. 导入`fileupload`和`io`坐标
> 2. 配置文件上传解析器
> 3. 编写文件上传代码



`spring-mvc.xml`编写如下配置，`bean的id`必须是`multipartResolver`

```xml
<!-- 配置文件上传解析器 -->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
    <!-- 上传文件总大小 -->
    <property name="maxUploadSize" value="10240" />
    <!-- 上传单个文件的大小 -->
    <property name="maxUploadSizePerFile" value="10240" />
    <!-- 上传文件的编码类型 -->
    <property name="defaultEncoding" value="UTF-8" />
</bean>
```

```java
@ResponseBody
@RequestMapping(value = "/file_upload")
public void file_upload(String username, MultipartFile file) throws IOException {
    // 获取文件名称
    String filename = file.getOriginalFilename();
    System.out.println(filename);
    // 保存文件
    file.transferTo(new File("C:\\Users\\Junyi\\Desktop\\upload\\" + filename));
}
```

发起请求：http://127.0.0.1:8088/file_upload  (`POST`)





### JDBCTemplate

> `jdbcTemplate`是`Spring`框架中提供的一个对象，是对原始繁琐的`jdbc API`对象的简单封装。

> `JDBCTemplate`开发步骤：
>
> 1. 导入`spring-jdbc`和`spring-tx`坐标
> 2. 创建数据库表和实体
> 3. 创建`jdbcTemplate`对象
> 4. 执行数据库操作

导坐标

```xml
<!-- 导入jdbctemplate依赖 -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.2.4.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
    <version>5.2.4.RELEASE</version>
</dependency>
```

配置数据库连接池连接信息

`jdbc.properties`

```properties
jdbc.Driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://127.0.0.1:3307/test
jdbc.username=root
jdbc.password=123456
```

`applicationContext.xml`

```xml
<!-- mysql配置信息文件 -->
<context:property-placeholder location="classpath:jdbc.properties" />
<!-- 数据源对象 -->
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="${jdbc.Driver}" />
    <property name="jdbcUrl" value="${jdbc.url}" />
    <property name="user" value="${jdbc.username}" />
    <property name="password" value="${jdbc.password}" />
</bean>
<!-- jdbc模板对象 -->
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <property name="dataSource" ref="dataSource" />
</bean>
```

创建测试类

**注意：**查询时，需要传入`new BeanPropertyRowMapper<Account>(Account.class)`对象，泛型为要映射的实体类，参数为实体类字节码

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class Test01 {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    public void add() {
        // 增加
        int add = jdbcTemplate.update("insert into account values(?, ?)", "xiaomao", 6000);
        System.out.println(add);

        // 更新
        int update = jdbcTemplate.update("update account set money=? where name=?", 10000, "xiaomao");
        System.out.println(update);

        // 删除
        int del = jdbcTemplate.update("delete from account where name=?", "xiaomao");
        System.out.println(del);

        // 查询(全部)
        List<Account> list = jdbcTemplate.query("select * from account", new BeanPropertyRowMapper<Account>(Account.class));
        System.out.println(list);

        // 查询(单个)
        Account lisi = jdbcTemplate.queryForObject("select * from account where name=?", new BeanPropertyRowMapper<Account>(Account.class), "lisi");
        System.out.println(lisi);
        
        // 聚合运算
        Long count = jdbcTemplate.queryForObject("select count(*) from account", Long.class);
        System.out.println(count);
    }
}
```



### Interceptor 拦截器

> `SpringMVC`的拦截器类似于`servlet`开发中的过滤器`Filter`，用于对处理器进行`预处理`和`后处理`。
>
> 
>
>  过滤器是在`DispatcherServlet`处理之前拦截，拦截器是在`DispatcherServlet`处理请求然后调用控制器方法(即我们自己写的处理请求的方法，用`@RequestMapping`标注)之前进行拦截。



| 区别     | 过滤器(Filter)                                               | 拦截器(Interceptor)                                          |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 使用范围 | 是`servlet`规范中的一部分，任何`JavaWeb`工程都可以使用       | 是`SpringMVC`框架自己的，只有使用了`SpringMVC框架的工程`才能使用 |
| 拦截范围 | 在`url-pattern中`配置了`/**`之后，可以对所有要访问的资源拦截 | 在`<mvc:mapping path="" />`中配置了`/**`之后，也可以对所有资源进行拦截，但是可以通过`<mvc:exclude-mapping path="" />`标签排除不需要拦截的资源 |



> 拦截器的使用步骤：
>
> 1. 创建拦截器类实现`HandlerInterceptor`接口
> 2. 配置拦截器
> 3. 测试拦截器的拦截效果



创建拦截器并实现`HandlerInterceptor`接口

> 执行顺序：
>
> 1. `preHandle`
> 2. `postHandle`
> 3. `afterCompletion`

```java
public class MyInterceptor implements HandlerInterceptor {
    /**
     * 在目标方法拦截之前执行
     * true : 放行
     * false: 不放行
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandle is running...");
        return true;
    }

    /**
     * 在目标方法执行完毕后返回视图之前执行
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle is running...");
    }

    /**
     * 在目标方法完全结束之后执行
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("afterCompletion is running...");
    }
}
```

`spring-mvc.xml`配置拦截器

```xml
<!-- 配置拦截器 -->
<mvc:interceptors>
    <!-- 第一个拦截器 -->
    <mvc:interceptor>
        <!-- 对所有资源都拦截 -->
        <mvc:mapping path="/**"/>
        <bean class="com.ginyi.Interceptor.MyInterceptor" />
    </mvc:interceptor>
</mvc:interceptors>
```

多个拦截器的拦截顺序

![23140115-9e08f08dc9e148ca](https://gitee.com/my-images/typora-imgs/raw/master/23140115-9e08f08dc9e148ca.webp)







### SpringMVC异常处理机制

> 先不写...













### AOP

> `AOP`为`A`spect `O`riented `P`rogramming的缩写，意思为`面向切面编程`，是通过`预编译`方式和`运行期动态代理`实现程序功能的统一维护的`一种技术`

> AOP的作用及其优势：
>
> - 作用：在程序运行期间，在不修改源码的情况下对方法进行功能增强
> - 优势：减少重复代码，提高开发效率，并且便于维护

> AOP的底层实现：
>
> ​     实际上，`AOP`的底层是通过`Spring`提供的`动态代理`技术实现的。在运行期间，Spring通过动态代理技术动态的生成对象，代理对象方法执行时进行增强功能的介入，在去调用目标对象的方法，从而完成功能的增强。

> AOP的动态代理技术
>
> 1. `JDK代理`：基于`接口`的动态代理技术
> 2. `cglib`：基于`父类`的动态代理技术



#### JDK代理

> - 目标接口
> - 目标对象（接口实现类）
> - 增强对象
> - 代理测试



目标接口，`TargetInterface`

```java
package com.ginyi.Proxy.jdk;

public interface TargetInterface {
    public void save();
}

```

目标对象，`Target`

```java
package com.ginyi.Proxy.jdk;

public class Target implements TargetInterface {
    @Override
    public void save() {
        System.out.println("save is running...");
    }
}
```

增强对象，`Advance`

```java
package com.ginyi.Proxy.jdk;

public class Advance {

    public void before() {
        System.out.println("前置增强...");
    }

    public void after() {
        System.out.println("后置增强...");
    }
}
```

代理测试，`ProxyTest`

**注意：**Proxy是`java.lang.reflect.Proxy`包下的

```java
package com.ginyi.Proxy.jdk;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class ProxyTest {

    public static void main(String[] args) {

        // 目标对象
        Target target = new Target();
        // 增强对象
        Advance advance = new Advance();

        TargetInterface proxy = (TargetInterface) Proxy.newProxyInstance(
                target.getClass().getClassLoader(),
                target.getClass().getInterfaces(), new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        advance.before();   // 前置增强
                        Object invoke = method.invoke(target, args);    // 执行目标对象方法
                        advance.after();    // 后置增强
                        return invoke;
                    }
                }
        );
        proxy.save();
    }
}

```

```
前置增强...
save is running...
后置增强...
```





#### cglib代理

> - 目标对象
> - 增强对象
> - 代理测试



目标对象，`Target`

```java
package com.ginyi.Proxy.cglib;


public class Target {

    public void save() {
        System.out.println("save is running...");
    }
}
```

增强对象，`Advance`

```java
package com.ginyi.Proxy.cglib;

public class Advance {

    public void before() {
        System.out.println("前置增强...");
    }

    public void after() {
        System.out.println("后置增强...");
    }
}
```

代理测试，`ProxyTest`

```java
package com.ginyi.Proxy.cglib;

import org.springframework.cglib.proxy.Enhancer;
import org.springframework.cglib.proxy.MethodInterceptor;
import org.springframework.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

public class ProxyTest {

    public static void main(String[] args) {

        // 目标对象
        Target target = new Target();
        // 增强对象
        Advance advance = new Advance();


        // 1、创建增强器
        Enhancer enhancer = new Enhancer();
        // 2、设置父类(目标对象)
        enhancer.setSuperclass(Target.class);
        // 3、设置回调
        enhancer.setCallback(new MethodInterceptor() {
            @Override
            public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
                advance.before();   // 前置增强
                Object invoke = method.invoke(target, args);    // 执行目标对象方法
                advance.after();    // 后置增强
                return invoke;
            }
        });
        Target proxy = (Target) enhancer.create();
        proxy.save();
    }
}
```

```
前置增强...
save is running...
后置增强...
```



#### AOP专业术语

|                         |                                                              |
| ----------------------- | ------------------------------------------------------------ |
| `Target`（目标对象）    | 指的是代理的目标对象                                         |
| `Proxy`（代理）         | 指的是一个类被`AOP`织入增强后，就产生了一个结果代理类        |
| `Joinpoint`（连接点）   | 指的是被拦截的点，指`方法`                                   |
| `Pointcut`（切入点）    | 指的是要对哪些`Jointpoint`（连接点：方法）进行拦截的定义（被增强的方法） |
| `Advice`（通知 / 增强） | 指的是拦截到`Jointpoint`之后所要做的事情就是通知（封装增强业务逻辑的方法） |
| `Aspect`（切面）        | 指的是切入点和通知的结合（切点 +  通知）                     |
| `Weaving`（织入）       | 指的是把增强应用到目标对象来创建新的代理对象的过程（将切点与通知结合的过程） |





#### AOP快速入门

> AOP开发步骤：
>
> 1. 导入`AOP相关坐标`
> 2. 创建目标接口和目标类（内部有切点）
> 3. 创建切面类（内部有增强方法）
> 4. 将目标类和切面类的对象创建权交给`Spring`
> 5. 在`applicationContext.xml`中配置织入关系
> 6. 测试



1、导坐标

```xml
<!-- 添加spring-context依赖 -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.2.4.RELEASE</version>
</dependency>
<!-- aop -->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.8.4</version>
</dependency>
```

2、创建目标接口和目标类

目标接口

```java
package com.ginyi.Aop;

public interface TargetInterface {
    public void save();
}

```

目标接口实现类

```java
package com.ginyi.Aop;

public class Target implements TargetInterface {
    @Override
    public void save() {
        System.out.println("save is running...");
    }
}

```

3、创建切面类（内部有增强方法）

```java
package com.ginyi.Aop;

public class MyAspect {

    public void before(){
        System.out.println("前置增强...");
    }

    public void after(){
        System.out.println("后置增强...");
    }
}
```

4、将目标类和切面类的对象创建权交给`Spring`

```xml
<!-- 目标对象 -->
<bean id="target" class="com.ginyi.Aop.Target"></bean>

<!-- 切面对象 -->
<bean id="myAspect" class="com.ginyi.Aop.MyAspect"></bean>

<!-- 配置织入 -->
<aop:config>
    <!-- 声明切面 -->
    <aop:aspect ref="myAspect">
        <!-- 切面: 切点 + 通知 -->
        <aop:before method="before" pointcut="execution(public void com.ginyi.Aop.Target.save())" />
    </aop:aspect>
</aop:config>
```

5、测试

```java
 @Autowired
private TargetInterface target; // 要用接口类型接收

@Test
public void testAop(){
    target.save();
}
```

```
前置增强...
save is running...
```



#### AOP切点表达式

> 问题：上述代码切面中切点表达式，仅仅对`com.ginyi.Aop.Target.save()`方法起作用
>
> 解决：使用切点表达式



表达式语法

> `execution([修饰符] 返回值类型 包名.类名.方法名(参数))`

- 访问修饰符可以省略
- 返回值类型、包名、类名、方法名可以使用星号`*`代表`任意`
- 包名与类名之间一个点`.`代表`当前包下的类`，两个点`..`表示`当前包及其子包下的类`
- `参数列表`可以使用两个点`..`表示`任意个数，任意类型`的参数列表

| 表达式                                               | 含义                                                      |
| ---------------------------------------------------- | --------------------------------------------------------- |
| `execution(public void com.ginyi.Aop.Target.save())` | `Target包`下的`save无参`的方法                            |
| `execution(void com.ginyi.Aop.Target.*(..))`         | `Target包`下的`任意类型`的`任意参数`的方法                |
| `execution(* com.ginyi.Aop.*.*(..))`                 | `Aop包`下的`任意类`的`任意类型`的`任意参数`的方法`(常用)` |
| `execution(* com.ginyi.Aop.*.*(..))`                 | `Aop包及其子包`下的`任意类`的`任意类型`的`任意参数`的方法 |
| `execution(* *..*.*(..))`                            | 无意义                                                    |



#### AOP切点表达式的抽取

```xml
<aop:config>
    <aop:aspect ref="myAspect">
        <!-- 切点表达式的抽取 -->
        <aop:pointcut id="myPointcut" expression="execution(* com.ginyi.Aop.*.*(..))"/>
        <aop:before method="before" pointcut-ref="myPointcut" />
        
    </aop:aspect>
</aop:config>
```



#### AOP通知的类型

| 名称         | 标签                    | 说明                                                         |
| ------------ | ----------------------- | ------------------------------------------------------------ |
| 前置通知     | `<aop:before>`          | 用于配置前置通知，指定增强的方法在切入点方法之前执行。       |
| 后置通知     | `<aop:after-returning>` | 用于配置后置通知，指定增强的方法在切入点方法之后执行。       |
| 环绕通知     | `<aop:around>`          | 用于配置环绕通知，指定增强的方法在切入点方法之前和之后都执行。 |
| 异常抛出通知 | `<aop:throwing>`        | 用于配置异常抛出通知，指定增强的方法在出现异常时执行。       |
| 最终通知     | `<aop:after>`           | 用于配置最终通知，无论增强方式执行是否有异常都会执行。       |





#### AOP注解配置

> 快速入门：
>
> 1. 创建目标接口和目标类（内部有切点）
> 2. 创建切面类（内部有增强方法）
> 3. 将目标类和切面的对象创建权交给spring
> 4. 在切面类中使用注解配置织入关系
> 5. 在配置文件中开启组件扫描和AOP的自动代理
> 6. 测试

| 注解       | 作用                       |
| ---------- | -------------------------- |
| @Component | 声明bean                   |
| @Aspect    | 声明切面                   |
| @Before    | 前置增强，参数是切点表达式 |
| @After     | 后置增强，参数是切点表达式 |



创建目标接口和目标类（内部有切点）

```java
package com.ginyi.Aop.Anno;

public interface TargetInterface {
    public void save();
}

```

```java
package com.ginyi.Aop.Anno;

import org.springframework.stereotype.Component;

@Component
public class Target implements TargetInterface {
    @Override
    public void save() {
        System.out.println("save is running...");
    }
}

```

创建切面类（内部有增强方法），在切面类中使用注解配置织入关系

```java
package com.ginyi.Aop.Anno;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect // 声明切面
public class MyAspect {

    // 前置增强
    @Before("execution(* com.ginyi.Aop.Anno.*.*(..))")
    public void before(){
        System.out.println("前置增强...");
    }

    // 后置增强
    @After("execution(* com.ginyi.Aop.Anno.*.*(..))")
    public void after(){
        System.out.println("后置增强...");
    }
}

```

在配置文件中开启组件扫描和AOP的自动代理

```xml
<!-- 开启组件扫描 -->
<context:component-scan base-package="com.ginyi.Aop.Anno" />
<!-- 开启切面自动代理 -->
<aop:aspectj-autoproxy />
```

测试

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext-anno.xml")
public class Test02 {

    @Autowired
    private TargetInterface target; // 要用接口类型接收

    @Test
    public void testAop(){
        target.save();
    }
}
```

```
前置增强...
save is running...
后置增强...
```





### 事务

#### 事务平台管理器

> `PlatformTranscationManager`接口是`spring`的`事务管理器`，它里面提供了我们常用的操作事务的方法

| 方法                                                         | 说明               |
| ------------------------------------------------------------ | ------------------ |
| `TranscationStatus getTranscation(TranscationDefination defination)` | 获取事务的状态信息 |
| `void commit(TranscantionStatus status)`                     | 提交事务           |
| `void rollback(Transcation status)`                          | 回滚事务           |

**注意：**`PlatformTranscationManager`是`接口类型`，不同的`dao`层技术则有不同的实现类，

例如：`dao`层技术是`jdbc或mybatis`时，是`org.springframework.jdbc.datasource.DataSourceTranscationManager`，`dao`层技术是`hibernate`时，是`org.springframework.orm.hibernate5.HibernateTranscationManager`





#### 事务定义对象

> `TranscationDefinition`是事务的定义信息对象，有如下方法：

| 方法                           | 说明               |
| ------------------------------ | ------------------ |
| `int getIsolationLevel()`      | 获得事务的隔离级别 |
| `int getPropogationBehavior()` | 获得事务的传播行为 |
| `int getTimeout()`             | 获得超时时间       |
| `boolean isReadOnly()`         | 是否只读           |

> 事务的隔离级别：
>
> ​	设置隔离级别，可以解决事务并发产生的问题，如脏读、不可重复读、和虚读。
>
> - `ISOLATION_DEFAULT` 默认的 
> - `ISOLATION_READ_UNCOMMITTED`  读未提交
> - `ISOLATION_READ_COMMITTED`  读已提交，解决脏读
> - `ISOLATION_REPEATABLE_READ` 可重复读，解决不可重复读
> - `ISOLATION_SERIALIZABLE` 串行化



> 事务的传播行为：
>
> - `REQUIRED` **如果当前没有事务，就新建一个事务，如果已经存在一个事务，就加入到这个事务中，一般的选择（默认值）**
> - `SUPPORTS` **支持当前事务，如果当前没有事务，就以非事务方式执行**
> - `MANDATORY` 使用当前的事务，如果当前没有事务，就抛出异常
> - `REQUERS_NEW` 新建事务，如果当前在事务中，把事务挂起
> - `NOT_SUPPORTED` 以非事务方式执行操作，如果当前存在事务，就把事务挂起
> - `NEVER` 以非事务方式运行，如果当前存在事务，抛出异常
> - `NESTED` 如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则执行`REQUIRED`类似的操作
> - `超时时间` 默认值是`-1`，没有超时限制。如果有，以秒为单位进行设置
> - `是否只读`建议 **查询时设置为只读**





#### 事务状态

> `TranscationStatus`接口提供的事务具体的运行状态，方法介绍如下：

| 方法                         | 说明           |
| ---------------------------- | -------------- |
| `boolean hasSacepoint()`     | 是否存储回滚点 |
| `boolean isCompleted()`      | 事务是否完成   |
| `boolean isNewTranscation()` | 是否是新事务   |
| `boolean isRollbackOnly()`   | 事务是否回滚   |



#### 基于XML的声明式事务控制

> Spring的声明式事务顾名思义就是采用声明的方式来处理事务。这里所说的声明，就是指`在配置文件中声明`，用在Spring配置文件中声明式的处理事务来代替代码式的处理事务。
>
> **优点：**`不侵入组件（解耦）`
>
> **注意：**Spring的声明式事务控制底层就是`AOP`



核心配置

```xml
<bean id="accountDao" class="com.ginyi.Dao.Impl.AccountDaoImpl">
    <property name="jdbcTemplate" ref="jdbcTemplate" />
</bean>
<!-- 目标对象 内部的方法就是切点 -->
<bean id="accountService" class="com.ginyi.Service.Impl.AccountServiceImpl">
    <property name="accountDao" ref="accountDao" />
</bean>

<!-- 配置平台事务管理器 -->
<bean id="transcationManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource" />
</bean>
<!-- 通知 事务的增强 -->
<tx:advice id="txAdvice" transaction-manager="transcationManager">
    <tx:attributes>
        <!-- 设置事务的属性信息 -->
        <tx:method name="*" isolation="DEFAULT" propagation="REQUIRED" timeout="-1" read-only="false"/>
    </tx:attributes>
</tx:advice>
<!-- 配置事务的织入 -->
<aop:config>
    <!-- 事务的增强用 advisor , 普通增强用aspect-->
    <aop:advisor advice-ref="txAdvice" pointcut="execution(* com.ginyi.Service.Impl.*.*(..))"></aop:advisor>
</aop:config>
```

> 代码说明：模拟银行转账，扣除转出者金额给转入者，如果转账程序出现异常，则将事务回滚。 代码详情如下

service层接口和实现类

```java
package com.ginyi.Service;

public interface AccountService {
    public void transfer(String outMan, String inMan, int money);
}

```

```java
package com.ginyi.Service.Impl;

import com.ginyi.Dao.AccountDao;
import com.ginyi.Service.AccountService;

public class AccountServiceImpl implements AccountService {

    private AccountDao accountDao;

    public void setAccountDao(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    @Override
    public void transfer(String outMan, String inMan, int money) {
        accountDao.out(outMan, money);
        // int a = 1/0;	// 模拟异常的出现，阻碍事务的正常操作
        accountDao.in(inMan, money);
    }
}
```

dao层的接口和实现类

```java
package com.ginyi.Dao;

public interface AccountDao {

    public void out(String outMan, int money);
    public void in(String inMan, int money);
}

```

```java
package com.ginyi.Dao.Impl;

import com.ginyi.Dao.AccountDao;
import org.springframework.jdbc.core.JdbcTemplate;

public class AccountDaoImpl implements AccountDao {

    private JdbcTemplate jdbcTemplate;

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void out(String outMan, int money) {
        jdbcTemplate.update("update account set money=money-? where name=?", money, outMan);
    }

    @Override
    public void in(String inMan, int money) {
        jdbcTemplate.update("update account set money=money+? where name=?", money, inMan);
    }
}

```

测试

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext-anno.xml")
public class Test03 {

    @Test
    public void Test(){
        ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        AccountService service = (AccountService) app.getBean("accountService");
        service.transfer("laoliu", "wangwu", 500);
    }
}
```



#### 基于注解的声明式事务控制

核心配置

```xml
<!-- 开启组件扫描 -->
<context:component-scan base-package="com.ginyi" />

<!-- 配置平台事务管理器 -->
<bean id="transcationManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource" />
</bean>
<!-- 事务的注解驱动 -->
<tx:annotation-driven transaction-manager="transcationManager"/>
```

> **关键注解：**`@Transactional`，可作用在类上，也可作用在方法上（`就近原则`）
>
> 注解示例：`@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED, timeout = -1)`

service层接口和实现类

```java
package com.ginyi.Service;

public interface AccountService {
    public void transfer(String outMan, String inMan, int money);
}

```

```java
package com.ginyi.Service.Impl;

import com.ginyi.Dao.AccountDao;
import com.ginyi.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("accountService")
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountDao accountDao;

    public void setAccountDao(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED, timeout = -1)
    public void transfer(String outMan, String inMan, int money) {
        accountDao.out(outMan, money);
        accountDao.in(inMan, money);
    }
}

```

dao层的接口和实现类

```java
package com.ginyi.Dao;

public interface AccountDao {

    public void out(String outMan, int money);
    public void in(String inMan, int money);
}

```

```java
package com.ginyi.Dao.Impl;

import com.ginyi.Dao.AccountDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AccountDaoImpl implements AccountDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public void out(String outMan, int money) {
        jdbcTemplate.update("update account set money=money-? where name=?", money, outMan);
    }

    @Override
    public void in(String inMan, int money) {
        jdbcTemplate.update("update account set money=money+? where name=?", money, inMan);
    }
}

```

测试

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext-anno.xml")
public class Test03 {

    @Test
    public void Test(){
        ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        AccountService service = (AccountService) app.getBean("accountService");
        service.transfer("laoliu", "wangwu", 500);
    }
}
```







## **MyBatis**

> `MyBatis`是一款优秀的`持久层框架`，它`支持自定义 SQL`、`存储过程`以及`高级映射`。`MyBatis`免除了几乎所有的 `JDBC` 代码以及设置参数和获取结果集的工作。`MyBatis` 可以通过`简单`的 `XML` 或`注解`来配置和映射原始类型、接口和 `Java POJO（Plain Old Java Objects）`为数据库中的记录。



### MyBatis快速入门

> 开发步骤： 
>
> 1. 添加MyBatis坐标
> 2. 创建数据表
> 3. 创建实体类
> 4. 编写映射文件UserMapper.xml
> 5. 编写核心文件SqlMapConfig.xml
> 6. 测试



导坐标

```xml
<dependencies>
    <!-- mysql -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.32</version>
    </dependency>
    <!-- mybatis -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.4.6</version>
    </dependency>
    <!-- 单元测试 -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
    <!-- 日志 -->
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.17</version>
    </dependency>
</dependencies>
```

创建数据表

| 字段名     | 说明     |
| ---------- | -------- |
| `id`       | 用户id   |
| `username` | 用户名字 |
| `password` | 用户密码 |





创建实体类

```java
package com.ginyi.pojo;

public class User {
    private int id;
    private String username;
    private String password;
    
    // 省略set get toString
}
```



编写映射文件`UserMapper.xml`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="userMapper">

    <select id="findAll" resultType="com.ginyi.pojo.User">
        select * from user
    </select>

</mapper>
```



编写核心配置文件 `SqlMapConfig.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

    <!-- 配置数据源环境 -->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3307/MyBatisTest"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>

    <!-- 加载映射文件 -->
    <mappers>
        <mapper resource="com/ginyi/mapper/UserMapper.xml" />
    </mappers>

</configuration>
```



测试

```java
package test;

import com.ginyi.pojo.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class Test01 {

    @Test
    public void test01() throws IOException {
        // 获得核心配置文件
        InputStream resource = Resources.getResourceAsStream("sqlMapConfig.xml");
        // 获得session工厂
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resource);
        // 获得session会话对象
        SqlSession sqlSession = sqlSessionFactory.openSession();
        // 执行操作
        List<User> userList = sqlSession.selectList("userMapper.findAll");
        System.out.println(userList);
        // 释放资源
        sqlSession.close();

    }
}
```



### MyBatis的增删改查

增加

> `parameterType`参数类型，占位符只用井号
>
> **注意：**记得提交事务

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="userMapper">

    <insert id="save" parameterType="com.ginyi.pojo.User">
        insert into user values (#{id}, #{username}, #{password})
    </insert>

</mapper>

```

```java
@Test
public void test02() throws IOException {
    // 获得核心配置文件
    InputStream resource = Resources.getResourceAsStream("sqlMapConfig.xml");
    // 获得session工厂
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resource);
    // 获得session会话对象
    SqlSession sqlSession = sqlSessionFactory.openSession();

    // 执行操作
    User user = new User();
    user.setUsername("zhangsan");
    user.setPassword("000000");
    sqlSession.insert("userMapper.save", user);

    // 提交事务
    sqlSession.commit();

    // 释放资源
    sqlSession.close();

}
```



更新

> `parameterType`参数类型，占位符只用井号
>
> **注意：**记得提交事务

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="userMapper">

    <update id="update" parameterType="com.ginyi.pojo.User">
        update user set username=#{username}, password=#{password} where id=#{id}
    </update>

</mapper>
```

```java
@Test
public void test03() throws IOException {
    // 获得核心配置文件
    InputStream resource = Resources.getResourceAsStream("sqlMapConfig.xml");
    // 获得session工厂
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resource);
    // 获得session会话对象
    SqlSession sqlSession = sqlSessionFactory.openSession();

    // 执行操作
    User user = new User();
    user.setId(2);
    user.setUsername("tomya");
    user.setPassword("000000");
    sqlSession.insert("userMapper.update", user);

    // 提交事务
    sqlSession.commit();

    // 释放资源
    sqlSession.close();

}
```



删除

> `parameterType`参数类型是数据库对应的类型，根据id删除
>
> **注意：**记得提交事务

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="userMapper">

    <delete id="delete" parameterType="java.lang.Integer">
        delete from user where id=#{id}
    </delete>

</mapper>

```

```java
@Test
public void test04() throws IOException {
    // 获得核心配置文件
    InputStream resource = Resources.getResourceAsStream("sqlMapConfig.xml");
    // 获得session工厂
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resource);
    // 获得session会话对象
    SqlSession sqlSession = sqlSessionFactory.openSession();

    // 执行操作
    sqlSession.delete("userMapper.delete", 0);

    // 提交事务
    sqlSession.commit();
    // 释放资源
    sqlSession.close();

}
```



### MyBatis核心配置文件

#### environments

> 数据库环境的配置，支持多环境配置

```xml
<configuration>
    <!-- 配置数据源环境, 默认是development -->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"></transactionManager>
            <!-- 连接池 -->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3307/MyBatisTest"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
</configuration>
```



#### mappers

> 加载映射文件
>
> 使用相对于类路径的资源引用（常用）

```xml
<configuration>

    <!-- 加载映射文件 -->
    <mappers>
        <mapper resource="com/ginyi/mapper/UserMapper.xml" />
    </mappers>

</configuration>
```



#### Properties

> 将数据源信息单独抽离到一个`properties`文件，该标签用于加载`properties`文件

```xml
<configuration>

    <!-- 加载配置文件 -->
    <properties resource="jdbc.properties" />
    <!-- 配置数据源环境 -->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>

</configuration>
```



#### typeAliase

> `typeAliases` 用于定义类型别名

MyBatis定义好的常用的别名

| 别名      | 数据类型  |
| --------- | --------- |
| `string`  | `String`  |
| `long`    | `Long`    |
| `int`     | `Integer` |
| `double`  | `Double`  |
| `boolean` | `Boolean` |
| `... ...` | `... ...` |



自定义别名

> **注意：`**typeAliases`标签的位置有严格要求，排在`settings`后面
>
> `properties?,settings?,typeAliases?, ...`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

    <!-- 加载配置文件 -->
    <properties resource="jdbc.properties" />

    <!-- 定义别名 -->
    <typeAliases>
        <typeAlias type="com.ginyi.pojo.User" alias="user" />
    </typeAliases>

</configuration>
```



### MyBatis相应的API

#### SqlSessionFactory工厂对象

SqlSessionFactory有多个方法创建SqlSession实例。常用的有如下两个：

| 方法                              | 解释                               |
| --------------------------------- | ---------------------------------- |
| `openSession`                     | 会默认开启事务，但事务不会自动提交 |
| `openSession(boolean autoCommit)` | 设置为`true`，则自动提交事务       |



#### SqlSession会话对象

执行语句的方法主要有：

```java
<T> T selectOne(String statement, Object parameter)
<E> List<E> selectList(String statement, Object parameter)
int insert(String statement, Object parameter)
int update(String statement, Object parameter)
int delete(String statement, Object parameter)
```

操作事务的方法主要有：

```java
void commit() // 提交事务
void rollback() // 事务回滚
```

 

### MyBatis代理开发

>  Mapper接口开发需要遵循以下规范：
>
> 1. `Mapper.xml`文件中的`namespace`与`mapper接口的全限定名`相同
> 2. Mapper接口方法名和`Mapper.xml`中定义的`每个statement的id`相同
> 3. Mapper接口方法的`输入参数类型`和`Mapper.xml`中定义的每个`sql`的`parameterType`的类型相同
> 4. Mapper接口方法的`输出参数类型`和`Mapper.xml`中定义的每个`sql`的`resultType`的类型相同

![b2237e618479464d8b5ab7d66be353f9](https://gitee.com/my-images/typora-imgs/raw/master/b2237e618479464d8b5ab7d66be353f9.png)





示例Demo

新建mapper接口, `userMapper`

```java
package com.ginyi.dao;

import com.ginyi.pojo.User;

import java.util.List;

public interface UserMapper {
    public List<User> findAll();
}
```

配置`userMapper.xml`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<!-- 接口类全限定名 -->
<mapper namespace="com.ginyi.dao.UserMapper">

    <select id="findAll" resultType="user">
        select * from user
    </select>
    
    <select id="findById" parameterType="int" resultType="user">
        select * from user where id=#{id}
    </select>
    

</mapper>
```

测试

```java
package com.ginyi.service;

import com.ginyi.dao.UserMapper;
import com.ginyi.pojo.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class serviceDemo {

    public static void main(String[] args) throws IOException {
        InputStream resource = Resources.getResourceAsStream("SqlMapConfig.xml");
        SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(resource);
        SqlSession sqlSession = sessionFactory.openSession(true);

        // mapper代理
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);

        List<User> userList = mapper.findAll();
        System.out.println(userList);

        User user = mapper.findById(3);
        System.out.println(user);
    }
}
```



### MyBatis动态sql语句

#### where

> 避免使用 `where 1=1` 冗余条件代码，`MyBatis`自动判断是否需要加入` and or` 等关键字

#### if

> 根据实体类的不同取值，使用不同的`sql`语句来进行查询，满足条件时拼接上该条件

```xml
<select id="findAll" resultType="user">
    select * from user
    <where>
        /* test 为条件表达式 */
        <if test="id!=0">
            and id=#{id}
        </if>
        <if test="username != null">
            and username=#{username}
        </if>
    </where>
</select>
```

#### foreach

> 循环执行`sql`的拼接操作，如根据`ids`查询多个项，需要动态把id拼接上

```xml
<select id="findByIds" resultType="user" parameterType="list">
    select * from user
    <where>
        <!-- open 是开始标志 -->
        <!-- close 是结束标志 -->
        <!-- collection 是要循环的对象 -->
        <!-- item 是循环对象中的每一项 -->
        <!-- separator 是分隔符 -->
        <foreach collection="list" open="id in(" close=")" item="id" separator=",">
            #{id}
        </foreach>
    </where>
</select>
```

假设`list=[1, 2, 3]`， 则以上`sql`等同于`select * from user where id in(1, 2, 3)`







### MyBatis核心配置文件深入

#### typeHandlers

> 类型转换器
>
> 无论是`MyBatis`中设置一个参数时，还是从结果集中取出一个值时， 都会用类型处理器将获取的值以合适的方式`转换成 Java 类型`。

下表描述了一些默认的类型处理器

| 类型处理器              | Java 类型                    | JDBC 类型                               |
| ----------------------- | ---------------------------- | --------------------------------------- |
| `BooleanTypeHandler`    | `java.lang.Boolean, boolean` | `数据库兼容的 BOOLEAN`                  |
| `ByteTypeHandler`       | `java.lang.Byte, byte`       | `数据库兼容的 NUMERIC 或 BYTE`          |
| `ShortTypeHandler`      | `java.lang.Short, short`     | `数据库兼容的 NUMERIC 或 SHORT INTEGER` |
| `IntegerTypeHandler`    | `java.lang.Integer, int`     | `数据库兼容的 NUMERIC 或 INTEGER`       |
| `LongTypeHandler`       | `java.lang.Long, long`       | `数据库兼容的 NUMERIC 或 LONG INTEGER`  |
| `FloatTypeHandler`      | `java.lang.Float, float`     | `数据库兼容的 NUMERIC 或 FLOAT`         |
| `DoubleTypeHandler`     | `java.lang.Double, double`   | `数据库兼容的 NUMERIC 或 DOUBLE`        |
| `BigDecimalTypeHandler` | `java.math.BigDecimal`       | `数据库兼容的 NUMERIC 或 DECIMAL`       |
|                         |                              |                                         |



自定义类型转换

> 重写类型处理器或者创建自己想要的类型处理器来处理不支持或非标准的类型

例：一个Java中的Date类型数据，将其存到数据库时存成时间戳的毫秒数，取出来时转换成Java的Date



> 开发步骤：
>
> 1. 定义转换类继承类`BaseTypeHandler<T>`
> 2. 覆盖4个为实现的方法，其中`setNonNullParameter`为Java程序设置数据到数据库的回调方法，`getNullableResult`为查询时`mysql`的字符串类型转换成Java的type类型的方法
> 3. 再MyBatis核心配置文件进行注册
> 4. 测试转换是否正确



新建 DateTypeHandler 日期转换类

```java
package com.ginyi.handler;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

public class DateTypeHandler extends BaseTypeHandler<Date> {

    /**
     * 将Java类型转换成数据库需要的类型
     */
    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int i, Date date, JdbcType jdbcType) throws SQLException {
        long dateTime = date.getTime();
        preparedStatement.setLong(i, dateTime);
    }

    /**
     * 将数据库中的类型转换成Java类型
     * @param resultSet 查询的结果集
     * @param s 要转换的字段名称
     * @return 转换后返回
     * @throws SQLException
     */
    @Override
    public Date getNullableResult(ResultSet resultSet, String s) throws SQLException {
        long aLong = resultSet.getLong(s);
        Date date = new Date(aLong);
        return date;
    }

    // 将数据库中的类型转换成Java类型
    @Override
    public Date getNullableResult(ResultSet resultSet, int i) throws SQLException {
        long aLong = resultSet.getLong(i);
        Date date = new Date(aLong);
        return date;
    }

    // 将数据库中的类型转换成Java类型
    @Override
    public Date getNullableResult(CallableStatement callableStatement, int i) throws SQLException {
        long aLong = callableStatement.getLong(i);
        Date date = new Date(aLong);
        return date;
    }
}
```

在核心配置文件中注册

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

    <!-- 注册类型处理器 -->
    <typeHandlers>
        <typeHandler handler="com.ginyi.handler.DateTypeHandler" />
    </typeHandlers>

</configuration>
```



#### plugins

> MyBatis可以使用第三方的插件来对功能进行扩展，分页助手PageHelper是将分页的复杂操作进行封装，使用简单的方式即可获得分页的相关数据
>
> 
>
> 开发步骤：
>
> 1. 导入通用的PageHelper坐标
> 2. 在mybatis核心配置文件中配置PageHelper插件
> 3. 测试分页数据获取

```java
// 设置分页参数
PageHelper.startPage(1, 2);
List<User> userList = mapper.findAll();

// 根据查询出来的结果自动推导出其他分页数据
PageInfo<User> pageInfo = new PageInfo<User>(userList);
System.out.println("当前页：" + pageInfo.getPageNum());
System.out.println("每页显示条数：" + pageInfo.getPageSize());
System.out.println("总条数：" + pageInfo.getTotal());
System.out.println("总页数：" + pageInfo.getPages());
System.out.println("上一页：" + pageInfo.getPrePage());
System.out.println("下一页：" + pageInfo.getNextPage());
System.out.println("是否是第一页：" + pageInfo.isIsFirstPage());
System.out.println("是否是最后一页：" + pageInfo.isIsLastPage());
```



### MyBatis多表联查

> 建议使用`Vo`对象来接收查询的结果集

> `resultMap`标签说明：
>
> 1. `<resultMap>`是`Maybatis`的结果集封装，搭配`<select><association>`等标签的`resultMap`属性使用
> 2. `<resultMap>`的属性`id`为该封装规则的唯一标识，`type`为封装出来的类型
> 3. 以上为写法为` <resultMap id="orderMap" type="com.ginyi.Vo.resultVo.OrderVo">`
>
> `resultMap`的子标签说明：
>
> 1.  `<id>`：
>    1. 用来标识出对象的唯一性，比如用表的主键，如： `<id column="user_id" property="userId"/>`
>    2. `column`指的是数据库字段名或者其别名
>    3. `property`指定`javaBean`的属性名(类的属性名)
> 2.  `<result>`：
>    1. `非主键`的映射规则，如：`<result column="dept_name" property="deptName"/>`
>    2. `column`同`<id>`标签一样
>    3. `property`:同`<id>`标签一样
> 3. `<association>`：
>    1. 用来封装当前实体引用的另一实体，比如order实体中有user实体
>    2. `property`：指的是`当前实体`**(例如order中有user属性)**的属性名称`(例如user)`
>    3. `javaType`：指的是`当前实体`**(例如order中有user属性)**的属性名称`(例如user)`的`类型User`
>    4. 内部子标签同`resultMap`子标签一直(即嵌套)
> 4. `<collection>`：
>    1. 用来配置集合信息(`用于一对多`)，负责处理多行的结果集
>    2. `property`：指的是`当前实体`的属性**(例如user中有orderList属性，泛型是order)**的属性名称
>    3. `ofType`：指的是`属性的类型`，如order
>    4. 内部子标签同`resultMap`子标签一直(即嵌套)





### MyBatis注解开发

| 注解名称   | 作用                                    |
| ---------- | --------------------------------------- |
| `@Insert`  | 实现新增                                |
| `@Update`  | 实现更新                                |
| `@Delete`  | 实现删除                                |
| `@Select`  | 实现查询                                |
| `@Result`  | 实现结果集封装                          |
| `@Results` | 可以与`@Result`一起使用，封装多个结果集 |
| `@One`     | 实现一对一结果集封装                    |
| `@Many`    | 实现一对多结果集封装                    |
|            |                                         |



注解示例

xml文件配置的方式

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<!-- 接口类全限定名 -->
<mapper namespace="com.ginyi.dao.UserMapper">

    <select id="findById" resultType="com.ginyi.pojo.User" parameterType="int">
        select * from user where id=#{id}
    </select>

    <select id="findAll" resultType="com.ginyi.pojo.User">
        select * from user
    </select>

    <update id="update">
        update user set username=#{username}, password=#{password} where id=#{id}
    </update>

    <insert id="insert">
        insert into user values (#{id}, #{username}, #{password})
    </insert>

    <delete id="delete">
        delete from user where id=#{id}
    </delete>

</mapper>
```

注解的方式

```java
package com.ginyi.dao;

import com.ginyi.pojo.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface UserMapper {

    @Select("select * from user where id=#{id}")
    public User findById(int id);

    @Select("select * from user")
    public List<User> findAll();

    @Update("update user set username=#{username}, password=#{password} where id=#{id}")
    public void update(User user);

    @Insert("insert into user values (#{id}, #{username}, #{password})")
    public void insert(User user);

    @Delete("delete from user where id=#{id}")
    public void delete(int id);
}
```

**注意：**注解加载映射关系

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

    <!-- 加载映射关系 -->
    <mappers>
       <!-- 指定接口所在的包 -->
        <package name="com.ginyi.dao"/>
    </mappers>

</configuration>
```





## **MyBatis-Plus**

> `MyBatis-Plus`（简称 MP）是一个`MyBatis`的增强工具，在 `MyBatis `的基础上`只做增强不做改变`，为简化开发、提高效率而生。



### 特性

- **无侵入**：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑
- **损耗小**：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作
- **强大的 CRUD 操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求
- **支持 Lambda 形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
- **支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题
- **支持 ActiveRecord 模式**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作
- **支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）
- **内置代码生成器**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用
- **内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
- **分页插件支持多种数据库**：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库
- **内置性能分析插件**：可输出 SQL 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
- **内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作





### MybatisPlus快速入门

> 开发步骤： 
>
> 1. 添加MyBatis-plus坐标
> 2. 创建数据表
> 3. 创建实体类
> 4. 创建接口
> 5. 测试





MyBatisPlus 依赖

```xml
<!-- MySQL -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<!-- druid -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.23</version>
</dependency>
<!-- mybatis-plus -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.1</version>
</dependency>
```

创建数据表

```sql
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

创建实体类 user

```java
package com.example.domain;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String username;
    private String password;
    private Integer age;
    private String tel;
}
```

创建接口

```java
package com.example.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao extends BaseMapper<User> {
}
```

测试

```java
package com.example;

import com.example.dao.UserDao;
import com.example.domain.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class MybatisPlusApplicationTests {

    @Autowired
    private UserDao userDao;

    @Test
    void testFindAll() {
        List<User> userList = userDao.selectList(null);
        for (User user : userList) {
            System.out.println(user);
        }
    }

}
```

```
2022-08-24 16:58:41.308  INFO 18160 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2022-08-24 16:58:41.860  INFO 18160 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
User(id=1, username=tony, password=123456, age=3, tel=1380016489)
User(id=2, username=tom, password=111222, age=4, tel=1043764116)
User(id=3, username=lucy, password=666666, age=34, tel=1984677634)
```



