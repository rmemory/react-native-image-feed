# Views

There are two fairly distinct things we use View for:

First, we use View for layout. A View is commonly used as a container for other components. If we want to arrange a group of components vertically or horizontally, we will likely wrap those components in a View.

Second, we use View for styling our app. If we want to render a simple shape like a circle or rectangle, or if we want to render a border, a line, or a background color, we will likely use a View.

# Text 

<Text style={{ backgroundColor: 'red', width: 60, height: 60 }}>
Hello World
</Text>

Text context will automatically wrap around by default when it fills the width of the component. This is configurable with the numberOfLines prop.

<Text style={styles.text} numberOfLines={1}>
{fullname}
</Text>

# TouchableOpacity

The TouchableOpacity component is similar to View , but lets us easily respond to tap gestures in a performant way. The TouchableOpacity component fades out when pressed, and fades back in when released. The opacity animation happens on the native side (it doesn’t trigger a re-render), so the animation is extremely smooth and the interaction is low latency.

If you don’t like the opacity animation, you can instead use a TouchableHighlight for a background color changing animation.

One minor inconvenience with both TouchableOpacity and TouchableHighlight : these components can only have a single child element, so if we want multiple children, we will need to wrap them in a View.

# Image

There are two ways to include images in an app: we can bundle an image asset with our code (which will then get stored on the device), or we can download an image from a URI.

## URI loading

static propTypes = {
	image: Image.propTypes.source.isRequired,
}

	image={{
		uri: getImageFromId(id),
	}}

## Bundling Image Assets

To bundle an image asset, we can require the image by name from our project directory just like any other file. The React Native packager will give us a reference to this image (a number) that represents the image’s metadata. The packager will automatically bundle images for multiple pixel densities if we name them with the @ suffix: .png for standard resolution, @2x.png for 2x resolution, and @3x.png for 3x resolution. We can pass an image reference to the source prop of an Image to render it.

For example, if we had a file called foo.png in the root directory of our app, we could use:

<Image source={require('./foo.png')} />

## Loading remote assets

We can pass a callback function to the onLoad prop of Image to determine when the image has loaded.

### Loading status

handleLoad = () => {
	this.setState({ loading: false });
};

<View style={styles.image}>
	{loading && (
		<ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
	)}
	<Image
		style={StyleSheet.absoluteFill}
		source={image}
		onLoad={this.handleLoad}
	/>

## Common Image styles

resizeMode (can be a prop or style)

The options for resizeMode are:
• cover : The image scales uniformly to fill the Image component. The image will be cropped by the bounding box of the component if they have different aspect ratios.
• contain : The image scales uniformly to fit within the component. The component’s background color will show if they have different aspect ratios.
• stretch : The image stretches to fill the component.
• repeat : The image repeats itself at its intrinsic dimensions to fill the component (iOS-only).
• center : The image maintains its intrinsic dimensions, and is centered within the component.

## aspectRatio

We can use the aspectRatio style to render the image at a specific aspect ratio, regardless of its intrinsic dimensions. We provide a number value which represents the ratio of width to height. For example, if we set aspectRatio: 2 , this means the ratio of width to height is 2 to 1 – the image will render twice as wide as it is tall.

While most commonly used with images, the aspectRatio style can be used on any component, such as View or Text.

# ScrollView

The ScrollView is simpler than the FlatList : it will render all of its children in a vertically or horizontally scrollable list, without the additional complexity of the keyExtractor or renderItem props.

The ScrollView is well suited for scrolling through small quantities of content (fewer than 20 items or so). Content within a ScrollView is rendered even when it isn’t visible on the screen.

Debug tip: If the ScrollView doesn’t appear, we need to add flex: 1 to each parent and to the ScrollView itself. To debug, you can try setting a background color on each parent to see where flex: 1 stopped getting propagated down the component hierarchy.

renderItem = (item, index) => (
	<View key={index} style={styles.comment}>
		<Text>{item}</Text>
	</View>
);

const { items } = this.props;
return <ScrollView>{items.map(this.renderItem)}</ScrollView>;

# FlatList

FlatList components are used for rendering large quantities of scrollable content. Instead of rendering a children prop, the FlatList renders each item in an input data array using the renderItem prop (callback). The renderItem prop is a function which takes an item from the data array and maps it to a React Element. Also required is a keyExtractor prop (callback) which is passed an item from the data array, and is required to return a unique id for that item.

const keyExtractor = ({ id }) => id.toString();

static propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			author: PropTypes.string.isRequired,
		}),
	).isRequired,
};

renderItem = ({ item: { id, author } }) => (
	<Card
		fullname={author}
		image={{
			uri: getImageFromId(id),
		}}
	/>
);

<FlatList
	data={items}
	renderItem={this.renderItem}
	keyExtractor={keyExtractor}
/>

# Modal 

The Modal component lets us transition to an entirely different screen. This is most useful for simple apps, since for complex apps you’ll likely be using a navigation library which will come with its own way of doing modals.

Common props include:

• animationType - This controls how the modal animates in and out. One of 'none' , 'slide' , or 'fade' (defaults to 'none' ).
• onRequestClose - A function called when the user taps the Android back button.
• onShow - A function called after the modal is fully visible.
• transparent - A bool determining whether the background of the modal is transparent.
• visible - A bool determining whether the modal is visible or not.

	<Modal
		visible={showModal}
		animationType="slide"
		onRequestClose={this.closeCommentScreen}
	>
		<Comments
			style={styles.container}
			comments={commentsForItem[selectedItemId] || []}
			onClose={this.closeCommentScreen}
		// ...
		/>
	</Modal>

# Nested destructuring

This ...

renderItem = ({ item: { id, author } }) => {}

... is equivalent to:

renderItem = (obj) => {
	const id = obj.item.id;
	const author = obj.item.author;
}

# Absolute vs relative posititioning

## Relative 

When set to 'relative' (which is the default), we’re able to tweak the position of a component after it has already been laid out according to its flex , width , height , etc. We can use a combination of top , right , bottom , and left . For example, if we want to move a component down on the screen by 20 pixels different than it otherwise would be, we could say top: 20 to indicate that its top should be 20 pixels greater than it is currently.

This is different than using margin, padding, border.

## Absolute

When set to 'absolute' , the layout of the parent and the component’s flex style are completely ignored. Instead we use top , right , bottom , and left to specify exactly how the component should be placed within its parent. For example, if we want the component to be 10 pixels from the bottom and 20 pixels from the right side of its parent, we can say bottom: 20 , right: 10 . As always, we need to make sure the component has dimensions greater than 0. Since flex is ignored, we may need to specify a fixed width and height.

It’s common to use position: 'absolute' to make elements overlap. Suppose we want two sibling elements to overlap, filling their parent completely. We can add a style like this to both siblings:

const absoluteFillStyle = {
	position: 'absolute',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
};

This technique is so common that there’s a predefined style to do the same thing: StyleSheet.absoluteFill . This value can be passed directly to the style prop of an element. Alternately, you can use 

...StyleSheet.absoluteFillObject 

copying each of these properties into another style – this is useful if you want to override one or two properties but keep the rest.

# Dynamic vs Static styles

## Dynamic

export default Avatar = ({ size, backgroundColor, initials }) => {
	const style = {
		width: size,
		height: size,
		borderRadius: size / 2,
		backgroundColor,
	};


## Static

const styles = StyleSheet.create({
		container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: 'white',
	},
});

# Minimum size

A component must have both a non-zero width and height in order to render
anything on the screen. If the width is 0 , then nothing will render on the screen, no matter how large the height is.

Debug hint: when a component doesn’t show up on the screen, the first thing we should do is pass an explicit width and height style attribute (and also a backgroundColor , just to make sure something is visible). Once a component appears on the screen, we can start understanding the component hierarchy and evaluating how to tweak our styles.

When we use a fixed width or height , this includes the content area, the padding area, and the border width. Margin is not counted in the width or height , since it is space outside of the component’s edges.

# Flex

## Flex Direction (how it handles children)

The flexDirection we choose defines the primary axis. Children components are laid out along the primary axis. The orthogonal axis is called the secondary axis. The possible values for flexDirection are:
• column : for a vertical layout (the default)
• row : for a horizontal layout
• column-reverse: the same as column but flipped vertically
• row-reverse: the same as row but flipped horizontally

## Axis layout (how it handles children)

We can apply three style attributes to a parent component in order to specify the layout of its children. That is, we can specify where children render within a parent. The attributes are:
• justifyContent: Main axis (flex-start - default, flex-center, flex-end, space-around, space-between)
• alignItems: Cross axis (flex-start - default, flex-center, flex-end, stretch)

## Sizing (how it sizes relative to its parent)

With a flex of 1 , the component will expand to fill its parent entirely

With a flex value of 0 , the component will shrink to the minimum space possible (just large enough for the component’s children to be visible, if it has any)

# Expo Constants

import { Constants } from 'expo';

const styles = StyleSheet.create({
	container: {
	marginTop: Constants.statusBarHeight,
	flex: 1,
	backgroundColor: '#fff',
	},
});

# Conditional JSX

{!!linkText && (
	<TouchableOpacity onPress={onPressLinkText}>
		<Text numberOfLines={1}>{linkText}</Text>
	</TouchableOpacity>
)}

# Yoga

React Native uses the Yoga layout engine (also from Facebook). This is a cross-platform implementation of the flexbox algorithm. It matches the algorithm used by web browsers pretty closely, but with two important differences:
• The default values are different
• Yoga adds a couple new features that don’t exist in the browser (like aspectRatio )

# Screens

screens are components just like any other. However, it’s useful to think about screens slightly differently. Screens are components that fill the entire device screen. They often handle non-visual concerns, like fetching data and handling navigation to other screens.


# Activity Indicator

<View style={styles.image}>
	{loading && (
		<ActivityIndicator style={StyleSheet.absoluteFill} size={'large'} />
	)}
	<Image
		style={StyleSheet.absoluteFill}
		source={image}
		onLoad={this.handleLoad}
	/>
</View>