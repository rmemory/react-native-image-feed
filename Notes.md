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
anything on the screen. If the width is 0 , then nothing will render on the screen, no matter how large
the height is.

# Flex

## Flex Direction

The flexDirection we choose defines the primary axis. Children components are laid out along the primary axis. The orthogonal axis is called the secondary axis. The possible values for flexDirection are:
• column : for a vertical layout (the default)
• row : for a horizontal layout
• column-reverse: the same as column but flipped vertically
• row-reverse: the same as row but flipped horizontally

## Axis layout

We can apply three style attributes to a parent component in order to specify the layout of its children. That is, we can specify where children render within a parent. The attributes are:
• justifyContent: Main axis (flex-start - default, flex-center, flex-end, space-around, space-between)
• alignItems: Cross axis (flex-start - default, flex-center, flex-end, stretch)

## Sizing

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

# Bundling Image Assets

To bundle an image asset, we can require the image by name from our project directory just like any other file. The React Native packager will give us a reference to this image (a number) that represents the image’s metadata. The packager will automatically bundle images for multiple pixel densities if we name them with the @ suffix: .png for standard resolution, @2x.png for 2x resolution, and @3x.png for 3x resolution. We can pass an image reference to the source prop of an Image to render it.

For example, if we had a file called foo.png in the root directory of our app, we could use:

<Image source={require('./foo.png')} />

# Common Image styles

resizeMode (can be a prop or style)

The options for resizeMode are:
• cover : The image scales uniformly to fill the Image component. The image will be cropped by the bounding box of the component if they have different aspect ratios.
• contain : The image scales uniformly to fit within the component. The component’s background color will show if they have different aspect ratios.
• stretch : The image stretches to fill the component.
• repeat : The image repeats itself at its intrinsic dimensions to fill the component (iOS-only).
• center : The image maintains its intrinsic dimensions, and is centered within the component.

aspectRatio

We can use the aspectRatio style to render the image at a specific aspect ratio, regardless of its intrinsic dimensions. We provide a number value which represents the ratio of width to height. For example, if we set aspectRatio: 2 , this means the ratio of width to height is 2 to 1 – the image will render twice as wide as it is tall.

While most commonly used with images, the aspectRatio style can be used on any component, such as View or Text.

# Yoga

React Native uses the Yoga layout engine (also from Facebook). This is a cross-platform implementation of the flexbox algorithm. It matches the algorithm used by web browsers pretty closely, but with two important differences:
• The default values are different
• Yoga adds a couple new features that don’t exist in the browser (like aspectRatio )

# Absolute file style

It’s common to use position: 'absolute' to make elements overlap. Suppose we want two sibling elements to overlap, filling their parent completely. We can add a style like this to both siblings:

const absoluteFillStyle = {
	position: 'absolute',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
};

This style will cause an element to fill its parent completely, since its top will match its parent’s top, its right side will match its parent’s right side, and so on. This technique is so common that there’s a predefined style to do the same thing: StyleSheet.absoluteFill .

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